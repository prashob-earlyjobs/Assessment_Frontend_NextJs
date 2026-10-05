"use client";

import {
  Field,
  LanguagesField,
  PhoneField,
  emptyAddress,
  genderOptions,
  inputClass,
  roles,
  shell,
  type PersonalDetails,
  type PersonalErrors,
} from "@/components/become-a-recruiter/form-shared";

export function PersonalDetailsStep({
  value,
  errors,
  onChange,
}: {
  value: PersonalDetails;
  errors: PersonalErrors;
  onChange: (next: PersonalDetails) => void;
}) {
  function set<K extends keyof PersonalDetails>(key: K, next: PersonalDetails[K]) {
    onChange({ ...value, [key]: next });
  }

  function setCurrent(key: keyof PersonalDetails["current"], next: string) {
    const current = { ...value.current, [key]: next };
    onChange({
      ...value,
      current,
      permanent: value.sameAsCurrent ? { ...current } : value.permanent,
    });
  }

  function setPermanent(key: keyof PersonalDetails["permanent"], next: string) {
    onChange({ ...value, permanent: { ...value.permanent, [key]: next } });
  }

  function setSameAsCurrent(checked: boolean) {
    onChange({
      ...value,
      sameAsCurrent: checked,
      permanent: checked
        ? { ...value.current }
        : value.permanent.building
          ? value.permanent
          : emptyAddress(),
    });
  }

  const permanent = value.sameAsCurrent ? value.current : value.permanent;

  return (
    <div className="mt-8 space-y-10">
      <fieldset>
        <legend className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
          Role<span className="text-brand"> *</span>
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {roles.map((role) => {
            const active = value.role === role.value;
            return (
              <button
                key={role.value}
                type="button"
                onClick={() => set("role", role.value)}
                aria-pressed={active}
                className={`group relative overflow-hidden rounded-[6px] border px-4 py-4 text-left transition-[border-color,background-color] duration-300 ${
                  active
                    ? "border-brand bg-brand/[0.04]"
                    : "border-black/10 bg-white hover:border-black/20 hover:bg-neutral-50"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block text-[14px] font-medium tracking-[-0.02em] text-neutral-950">
                      {role.label}
                    </span>
                    <span className="mt-1 block text-[12px] leading-5 text-neutral-500">{role.hint}</span>
                  </span>
                  <span
                    aria-hidden
                    className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${
                      active ? "border-brand bg-brand" : "border-black/20 bg-white"
                    }`}
                  >
                    {active ? <span className="size-1.5 rounded-full bg-white" /> : null}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        {errors.role ? <p className="mt-1.5 px-1.5 text-[12px] text-red-500">{errors.role}</p> : null}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={errors.fullName}>
          <span className={shell(errors.fullName)}>
            <input
              value={value.fullName}
              onChange={(event) => set("fullName", event.target.value)}
              autoComplete="name"
              placeholder="Your full name"
              className={inputClass()}
            />
          </span>
        </Field>

        <Field label="Date of birth" required error={errors.dateOfBirth}>
          <span className={shell(errors.dateOfBirth)}>
            <input
              type="date"
              value={value.dateOfBirth}
              onChange={(event) => set("dateOfBirth", event.target.value)}
              max={maxAdultDate()}
              className={inputClass()}
            />
          </span>
        </Field>

        <fieldset className="min-w-0 sm:col-span-2">
          <legend className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
            Gender<span className="text-brand"> *</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {genderOptions.map((option) => {
              const active = value.gender === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => set("gender", option.value)}
                  aria-pressed={active}
                  className={`h-10 rounded-full px-4 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-brand text-white ring-1 ring-brand"
                      : "bg-neutral-50 text-neutral-600 ring-1 ring-black/5 hover:bg-neutral-100"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {errors.gender ? <p className="mt-1.5 px-1.5 text-[12px] text-red-500">{errors.gender}</p> : null}
        </fieldset>

        <PhoneField
          label="Phone"
          code={value.phoneCode}
          phone={value.phone}
          error={errors.phone}
          onCodeChange={(code) => set("phoneCode", code)}
          onPhoneChange={(phone) => set("phone", phone)}
        />

        <PhoneField
          label="WhatsApp"
          code={value.whatsappCode}
          phone={value.whatsapp}
          error={errors.whatsapp}
          onCodeChange={(code) => set("whatsappCode", code)}
          onPhoneChange={(phone) => set("whatsapp", phone)}
        />

        <Field label="Email" required error={errors.email} className="sm:col-span-2">
          <span className={shell(errors.email)}>
            <input
              type="email"
              value={value.email}
              onChange={(event) => set("email", event.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass()}
            />
          </span>
        </Field>
      </div>

      <section className="border-t border-black/10 pt-8">
        <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">Current address</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <AddressFields value={value.current} errors={errors} prefix="current" onChange={setCurrent} />
        </div>
      </section>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-700">
        <span
          className={`flex size-5 items-center justify-center rounded-md border transition-colors ${
            value.sameAsCurrent ? "border-brand bg-brand text-white" : "border-black/15 bg-white"
          }`}
        >
          <input
            type="checkbox"
            checked={value.sameAsCurrent}
            onChange={(event) => setSameAsCurrent(event.target.checked)}
            className="sr-only"
          />
          {value.sameAsCurrent ? <CheckIcon /> : null}
        </span>
        Permanent address is the same
      </label>

      {!value.sameAsCurrent ? (
        <section className="border-t border-black/10 pt-8">
          <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">Permanent address</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <AddressFields value={permanent} errors={errors} prefix="permanent" onChange={setPermanent} />
          </div>
        </section>
      ) : null}

      <div className="border-t border-black/10 pt-8">
        <LanguagesField
          value={value.languages}
          error={errors.languages}
          onChange={(languages) => set("languages", languages)}
        />
      </div>
    </div>
  );
}

function AddressFields({
  value,
  errors,
  prefix,
  onChange,
}: {
  value: PersonalDetails["current"];
  errors: PersonalErrors;
  prefix: "current" | "permanent";
  onChange: (key: keyof PersonalDetails["current"], value: string) => void;
}) {
  const fields = [
    { key: "building" as const, label: "Building / flat", placeholder: "House or flat number" },
    { key: "street" as const, label: "Street", placeholder: "Street name" },
    { key: "area" as const, label: "Area / village", placeholder: "Neighbourhood" },
    { key: "city" as const, label: "City / town", placeholder: "City" },
    { key: "state" as const, label: "State", placeholder: "State" },
    { key: "pincode" as const, label: "Pincode", placeholder: "560034" },
  ];

  return (
    <>
      {fields.map((field) => {
        const errorKey = `${prefix}.${field.key}` as keyof PersonalErrors;
        const error = errors[errorKey];
        return (
          <Field key={`${prefix}-${field.key}`} label={field.label} required error={error}>
            <span className={shell(error)}>
              <input
                value={value[field.key]}
                onChange={(event) =>
                  onChange(
                    field.key,
                    field.key === "pincode"
                      ? event.target.value.replace(/\D/g, "").slice(0, 6)
                      : event.target.value,
                  )
                }
                placeholder={field.placeholder}
                inputMode={field.key === "pincode" ? "numeric" : undefined}
                className={inputClass()}
              />
            </span>
          </Field>
        );
      })}
    </>
  );
}

function maxAdultDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date.toISOString().slice(0, 10);
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden>
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
