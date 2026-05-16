import { FormEvent, useState } from "react";
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";

type AdmissionEnquiry = {
  parentName: string;
  phone: string;
  childName: string;
  program: string;
};

const WHATSAPP_NUMBER = "917204039777";

export function Admissions() {
  const benefits = [
    "Safe and nurturing environment",
    "Experienced teachers",
    "Play-based learning approach",
    "Age-appropriate curriculum",
  ];

  const [form, setForm] = useState<AdmissionEnquiry>({
    parentName: "",
    phone: "",
    childName: "",
    program: "Nursery",
  });

  const updateForm = (field: keyof AdmissionEnquiry, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enquiryMessage = [
      "Hello Birla Open Minds Preschool And Day Care,",
      "I want to enquire about admission.",
      `Parent Name: ${form.parentName}`,
      `Mobile: ${form.phone}`,
      `Child Name: ${form.childName}`,
      `Program Interested: ${form.program}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiryMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      id="admissions"
      className="page-section page-section-vivid py-20 relative overflow-hidden ring-1 ring-white/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_55%)]" />
      <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm ring-2 ring-yellow-200/60 shadow-[0_0_24px_rgba(255,241,118,0.55)]">
              <Calendar className="h-5 w-5 text-white" />
              <span className="font-medium text-white">
                Now Open for 2026-27
              </span>
            </div>

            <h2 className="mb-5 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Admissions Open for 2026-27
            </h2>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/95 md:text-xl">
              Give your child the best start in life at Birla Open Minds
              Preschool And Day Care. Fill this quick admission enquiry form and
              our team will contact you.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-2xl bg-white/20 p-4 backdrop-blur-sm"
                >
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-white" />
                  <span className="text-left font-medium text-white">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-yellow-100/50 bg-white/15 p-6 shadow-[0_20px_70px_rgba(255,171,64,0.45)] backdrop-blur-xl md:p-7">
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              Admission Enquiry Form
            </h3>
            <p className="mt-2 text-sm text-white/85 md:text-base">
              Submit details and our admissions team will connect with you.
            </p>

            <form onSubmit={submitEnquiry} className="mt-6 space-y-4">
              <Field
                label="Parent Name"
                value={form.parentName}
                onChange={(value) => updateForm("parentName", value)}
                placeholder="Parent or guardian name"
              />
              <Field
                label="Mobile Number"
                value={form.phone}
                onChange={(value) => updateForm("phone", value)}
                placeholder="+91-XXXXXXXXXX"
                type="tel"
              />
              <Field
                label="Child Name"
                value={form.childName}
                onChange={(value) => updateForm("childName", value)}
                placeholder="Kid name"
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  Program Interested
                </label>
                <select
                  value={form.program}
                  onChange={(event) =>
                    updateForm("program", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/35 bg-white/90 px-4 py-3 text-slate-800 outline-none transition focus:border-white"
                  required
                >
                  <option>Playgroup</option>
                  <option>Nursery</option>
                  <option>Junior KG</option>
                  <option>Senior KG</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-bold text-[#a32035] transition hover:shadow-2xl"
              >
                Submit Enquiry
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <button
              onClick={() =>
                window.open("/apply-admission", "_blank", "noopener,noreferrer")
              }
              className="mt-4 w-full rounded-full border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open Full Admission Form
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "tel";
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/35 bg-white/90 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-white"
        required
      />
    </div>
  );
}
