import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, Save, Send } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingElements } from "../components/FloatingElements";
import { ScrollToTop } from "../components/ScrollToTop";
import { Link } from "react-router";

type AdmissionFormState = {
  parentName: string;
  relationship: string;
  phone: string;
  alternatePhone: string;
  email: string;
  childName: string;
  childDob: string;
  ageGroup: string;
  program: string;
  startDate: string;
  address: string;
  city: string;
  notes: string;
};

const STORAGE_KEY = "birla-open-minds-admission-form";

const initialForm: AdmissionFormState = {
  parentName: "",
  relationship: "Mother",
  phone: "+91-7204039777",
  alternatePhone: "",
  email: "",
  childName: "",
  childDob: "",
  ageGroup: "",
  program: "Nursery",
  startDate: "",
  address: "",
  city: "Bengaluru East",
  notes: "",
};

export function ApplyAdmission() {
  const [form, setForm] = useState<AdmissionFormState>(initialForm);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as {
        values?: AdmissionFormState;
        savedAt?: string;
      };

      if (parsed.values) {
        setForm({ ...initialForm, ...parsed.values });
      }

      if (parsed.savedAt) {
        setSavedAt(parsed.savedAt);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const summary = useMemo(
    () => [
      { label: "School", value: "Birla Open Minds Preschool And Day Care" },
      { label: "Contact", value: "+91-7204039777" },
      { label: "Location", value: "Nimbekaipura, Bengaluru East" },
    ],
    [],
  );

  const updateField = (field: keyof AdmissionFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const timestamp = new Date().toLocaleString();

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ values: form, savedAt: timestamp }),
    );

    setSavedAt(timestamp);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingElements />
      <Header />

      <main className="pt-32 md:pt-36">
        <section className="page-section page-section-neutral pb-20 pt-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <Link
                    to="/"
                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Home
                  </Link>
                  <h1 className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl">
                    Admission Enquiry Form
                  </h1>
                  <p className="max-w-2xl text-lg text-slate-600">
                    Parents can fill in the child and family details here. Your
                    information is saved on this device so you can review and
                    continue later.
                  </p>
                </div>

                <div className="glass-card rounded-3xl border border-white/60 p-6 text-slate-700 shadow-lg">
                  <div className="mb-3 flex items-center gap-2 text-slate-900">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span className="font-semibold">Admission Desk</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {summary.map((item) => (
                      <div key={item.label}>
                        <span className="font-semibold text-slate-900">
                          {item.label}:
                        </span>{" "}
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.35fr_0.75fr]">
                <form
                  onSubmit={handleSubmit}
                  className="glass-card rounded-[32px] border border-white/60 p-6 shadow-xl md:p-8"
                >
                  <div className="mb-8 grid gap-6 md:grid-cols-2">
                    <Field
                      label="Parent Name"
                      value={form.parentName}
                      onChange={(value) => updateField("parentName", value)}
                      placeholder="Parent or guardian name"
                      required
                    />
                    <SelectField
                      label="Relationship"
                      value={form.relationship}
                      onChange={(value) => updateField("relationship", value)}
                      options={["Mother", "Father", "Guardian"]}
                    />
                    <Field
                      label="Primary Mobile"
                      value={form.phone}
                      onChange={(value) => updateField("phone", value)}
                      placeholder="+91-XXXXXXXXXX"
                      required
                    />
                    <Field
                      label="Alternate Mobile"
                      value={form.alternatePhone}
                      onChange={(value) => updateField("alternatePhone", value)}
                      placeholder="Optional"
                    />
                    <Field
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={(value) => updateField("email", value)}
                      placeholder="parent@example.com"
                      required
                    />
                    <Field
                      label="Child Name"
                      value={form.childName}
                      onChange={(value) => updateField("childName", value)}
                      placeholder="Kid name"
                      required
                    />
                    <Field
                      label="Date of Birth"
                      type="date"
                      value={form.childDob}
                      onChange={(value) => updateField("childDob", value)}
                      required
                    />
                    <Field
                      label="Age"
                      value={form.ageGroup}
                      onChange={(value) => updateField("ageGroup", value)}
                      placeholder="Example: 3 years"
                      required
                    />
                    <SelectField
                      label="Program"
                      value={form.program}
                      onChange={(value) => updateField("program", value)}
                      options={[
                        "Playgroup",
                        "Nursery",
                        "Junior KG",
                        "Senior KG",
                        "Day Care",
                      ]}
                    />
                    <Field
                      label="Preferred Start Date"
                      type="date"
                      value={form.startDate}
                      onChange={(value) => updateField("startDate", value)}
                    />
                    <Field
                      label="City / Area"
                      value={form.city}
                      onChange={(value) => updateField("city", value)}
                      placeholder="Bengaluru East"
                      required
                    />
                    <Field
                      label="Address"
                      value={form.address}
                      onChange={(value) => updateField("address", value)}
                      placeholder="Home address"
                      required
                    />
                  </div>

                  <TextAreaField
                    label="Questions or Notes"
                    value={form.notes}
                    onChange={(value) => updateField("notes", value)}
                    placeholder="Share pickup timing, day care requirement, previous school details, or any specific questions."
                  />

                  <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-slate-600">
                      {savedAt
                        ? `Last saved on ${savedAt}`
                        : "Fill the form and save the details."}
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-7 py-3 text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
                    >
                      <Save className="h-4 w-4" />
                      Save Admission Details
                    </button>
                  </div>
                </form>

                <aside className="space-y-6">
                  <div className="glass-card rounded-[32px] border border-white/60 p-6 shadow-lg">
                    <h2 className="mb-4 text-2xl font-bold text-slate-900">
                      What parents should keep ready
                    </h2>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li>Child date of birth and age details</li>
                      <li>Parent phone number and email</li>
                      <li>Preferred program and joining date</li>
                      <li>Address and any medical or care notes</li>
                    </ul>
                  </div>

                  <a
                    href="https://wa.me/917204039777?text=Hello%20Birla%20Open%20Minds%20Preschool%20And%20Day%20Care%2C%20I%20have%20an%20admission%20query."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-[32px] bg-emerald-500 p-6 text-white shadow-xl transition hover:translate-y-[-2px] hover:bg-emerald-600"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/18">
                      <Send className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="mb-1 block text-lg font-bold">
                        Need help right now?
                      </span>
                      <span className="block text-sm text-emerald-50">
                        Message the admission team on WhatsApp.
                      </span>
                    </span>
                  </a>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full rounded-[24px] border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
      />
    </label>
  );
}
