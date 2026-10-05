"use client";

import {
  Field,
  inputClass,
  shell,
  type ReferencePerson,
  type ReferencesErrors,
} from "@/components/become-a-recruiter/form-shared";

export function ReferencesDetailsStep({
  value,
  errors,
  onChange,
}: {
  value: ReferencePerson[];
  errors: ReferencesErrors;
  onChange: (next: ReferencePerson[]) => void;
}) {
  function update(index: number, patch: Partial<ReferencePerson>) {
    onChange(value.map((person, i) => (i === index ? { ...person, ...patch } : person)));
  }

  return (
    <div className="mt-8 space-y-10">
      <p className="text-sm leading-6 text-neutral-600">
        List any three persons (not related) (broad relations to you, who are professionally known to you).
      </p>

      {errors.duplicateContacts ? (
        <p className="text-[12px] text-red-500">{errors.duplicateContacts}</p>
      ) : null}
      {errors.duplicateEmails ? (
        <p className="text-[12px] text-red-500">{errors.duplicateEmails}</p>
      ) : null}

      {value.slice(0, 3).map((person, index) => {
        const row = errors.people?.[index] ?? {};
        return (
          <section
            key={index}
            className={index > 0 ? "border-t border-black/10 pt-8" : undefined}
          >
            <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">
              Person {index + 1}
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Name" required error={row.name}>
                <span className={shell(row.name)}>
                  <input
                    value={person.name}
                    onChange={(event) => update(index, { name: event.target.value })}
                    placeholder="Ex. John Doe"
                    autoComplete="name"
                    className={inputClass()}
                  />
                </span>
              </Field>

              <Field label="Contact Number" required error={row.contactNumber}>
                <span className={shell(row.contactNumber)}>
                  <input
                    value={person.contactNumber}
                    onChange={(event) =>
                      update(index, {
                        contactNumber: event.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    inputMode="numeric"
                    placeholder="Ex. 9876543210"
                    className={inputClass()}
                  />
                </span>
              </Field>

              <Field label="Mail ID" required error={row.email}>
                <span className={shell(row.email)}>
                  <input
                    type="email"
                    value={person.email}
                    onChange={(event) => update(index, { email: event.target.value })}
                    placeholder="Ex. hr@example.in"
                    autoComplete="email"
                    className={inputClass()}
                  />
                </span>
              </Field>

              <Field label="Organization" required error={row.organization}>
                <span className={shell(row.organization)}>
                  <input
                    value={person.organization}
                    onChange={(event) => update(index, { organization: event.target.value })}
                    placeholder="Ex. MicroSoft"
                    className={inputClass()}
                  />
                </span>
              </Field>

              <Field label="Designation" required error={row.designation}>
                <span className={shell(row.designation)}>
                  <input
                    value={person.designation}
                    onChange={(event) => update(index, { designation: event.target.value })}
                    placeholder="Ex. Hiring Manager"
                    className={inputClass()}
                  />
                </span>
              </Field>

              <Field label="How they know you?" required error={row.howTheyKnow}>
                <span className={shell(row.howTheyKnow)}>
                  <input
                    value={person.howTheyKnow}
                    onChange={(event) => update(index, { howTheyKnow: event.target.value })}
                    placeholder="Ex. Colleague"
                    className={inputClass()}
                  />
                </span>
              </Field>
            </div>
          </section>
        );
      })}
    </div>
  );
}
