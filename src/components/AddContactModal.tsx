import React from 'react';
import { Formik, Form, FieldProps, Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Contact, Department } from '../types';
import { Button, Input, Select } from './ui';

export interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (contact: Contact) => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  department: Department | '';
}

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  department: 'Desarrollo',
};

// Yup Validation Schema for required fields
const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es obligatorio'),
  email: Yup.string()
    .email('Ingrese un correo electrónico válido (ej: usuario@empresa.com)')
    .required('El correo electrónico es obligatorio'),
  phone: Yup.string()
    .matches(/^[0-9+\s-]{7,15}$/, 'Ingrese un número telefónico válido (mínimo 7 dígitos)')
    .required('El teléfono es obligatorio'),
  department: Yup.mixed<Department>()
    .oneOf(['Ventas', 'Desarrollo', 'Marketing', 'Soporte'], 'Seleccione un departamento válido')
    .required('El departamento es obligatorio'),
});

const departmentOptions = [
  { value: 'Ventas', label: 'Ventas' },
  { value: 'Desarrollo', label: 'Desarrollo' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Soporte', label: 'Soporte' },
];

export const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  onClose,
  onAddContact,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      {/* Modal Container */}
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-[#828d9e]/20 overflow-hidden text-left transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#f6f5f5] px-6 py-4 border-b border-[#828d9e]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2462ec]" />
            <h2 className="text-lg font-bold font-['Gotham',_sans-serif] text-[#1a2035]">
              Agregar Nuevo Contacto
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#828d9e] hover:text-[#1a2035] transition-colors p-1 rounded-lg hover:bg-black/5 cursor-pointer"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={contactSchema}
          validateOnMount={true}
          onSubmit={(values, { resetForm }) => {
            const newContact: Contact = {
              id: uuidv4(),
              name: values.name.trim(),
              email: values.email.trim(),
              phone: values.phone.trim(),
              department: values.department as Department,
            };
            onAddContact(newContact);
            resetForm();
            onClose();
          }}
        >
          {({ errors, touched, isValid, dirty, isSubmitting }) => (
            <Form className="p-6 space-y-5">
              {/* Field: Name */}
              <Field name="name">
                {({ field }: FieldProps) => (
                  <Input
                    {...field}
                    label="Nombre Completo"
                    placeholder="Ej: Ana María García"
                    error={touched.name && errors.name ? errors.name : undefined}
                    completed={Boolean(field.value && !errors.name)}
                  />
                )}
              </Field>

              {/* Field: Email */}
              <Field name="email">
                {({ field }: FieldProps) => (
                  <Input
                    {...field}
                    type="email"
                    label="Correo Electrónico"
                    placeholder="Ej: ana.garcia@empresa.com"
                    error={touched.email && errors.email ? errors.email : undefined}
                    completed={Boolean(field.value && !errors.email)}
                  />
                )}
              </Field>

              {/* Field: Phone */}
              <Field name="phone">
                {({ field }: FieldProps) => (
                  <Input
                    {...field}
                    type="tel"
                    label="Teléfono"
                    placeholder="Ej: 555-0199"
                    error={touched.phone && errors.phone ? errors.phone : undefined}
                    completed={Boolean(field.value && !errors.phone)}
                  />
                )}
              </Field>

              {/* Field: Department */}
              <Field name="department">
                {({ field, form }: FieldProps) => (
                  <Select
                    label="Departamento"
                    placeholder="Seleccione un departamento"
                    options={departmentOptions}
                    value={field.value}
                    onChange={(val) => form.setFieldValue('department', val)}
                    error={touched.department && errors.department ? errors.department : undefined}
                  />
                )}
              </Field>

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-[#f6f5f5] flex items-center justify-end gap-3">
                <Button variant="secondary" onClick={onClose} type="button">
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  Guardar Contacto
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
