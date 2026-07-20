import { User, Mail, Phone, MapPin, Globe, Briefcase } from 'lucide-react';

const PersonalInfoForm = ({ data, onChange }) => {

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: Briefcase, type: "text" },
    { key: "linkedin", label: "LinkedIn", icon: Globe, type: "url" },
    { key: "website", label: "Website", icon: Globe, type: "url" },
  ];

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h3>
        <p className="text-sm text-gray-500">
          Add your personal details
        </p>
      </div>

      {/* INPUTS */}
      <div className="space-y-4">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div key={field.key} className="space-y-1">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <Icon className="size-4" />
                {field.label}
                {field.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>

              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) =>
                  handleChange(field.key, e.target.value)
                }
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default PersonalInfoForm;