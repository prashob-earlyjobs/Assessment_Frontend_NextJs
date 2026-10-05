"use client";

import {
  CategoriesField,
  Field,
  inputClass,
  shell,
  wordCount,
  type AboutDetails,
  type AboutErrors,
} from "@/components/become-a-recruiter/form-shared";

export function AboutDetailsStep({
  value,
  errors,
  onChange,
}: {
  value: AboutDetails;
  errors: AboutErrors;
  onChange: (next: AboutDetails) => void;
}) {
  function set<K extends keyof AboutDetails>(key: K, next: AboutDetails[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <div className="mt-8 space-y-8">
      <WordField
        label="Tell us about yourself (minimum 50 words)"
        value={value.tellAboutYourself}
        error={errors.tellAboutYourself}
        onChange={(next) => set("tellAboutYourself", next)}
      />

      <WordField
        label="Why you want to join us as a HR Recruiter (minimum 50 words)"
        value={value.whyJoinHR}
        error={errors.whyJoinHR}
        onChange={(next) => set("whyJoinHR", next)}
      />

      <WordField
        label="How you can contribute to society as a Recruiter (minimum 50 words)"
        value={value.howContribute}
        error={errors.howContribute}
        onChange={(next) => set("howContribute", next)}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Daily hours you can contribute" required error={errors.hoursContribute}>
          <span className={shell(errors.hoursContribute)}>
            <input
              inputMode="numeric"
              value={value.hoursContribute}
              onChange={(event) =>
                set("hoursContribute", event.target.value.replace(/\D/g, "").slice(0, 2))
              }
              placeholder="Ex. 8"
              className={inputClass()}
            />
          </span>
        </Field>

        <Field label="How soon you can join (days)" required error={errors.availability}>
          <span className={shell(errors.availability)}>
            <input
              inputMode="numeric"
              value={value.availability}
              onChange={(event) =>
                set("availability", event.target.value.replace(/\D/g, "").slice(0, 3))
              }
              placeholder="Ex. 30"
              className={inputClass()}
            />
          </span>
        </Field>
      </div>

      <CategoriesField
        value={value.categories}
        error={errors.categories}
        onChange={(categories) => set("categories", categories)}
      />
    </div>
  );
}

function WordField({
  label,
  value,
  error,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const count = wordCount(value);

  return (
    <label className="block min-w-0">
      <span className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
        {label}
        <span className="text-brand"> *</span>
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Minimum of 50 words"
        rows={5}
        className={[
          "mt-2 w-full resize-y rounded-[18px] bg-neutral-50 px-4 py-3 text-[13px] text-neutral-950 outline-none ring-1 transition-[background-color,box-shadow] placeholder:text-neutral-400",
          error
            ? "ring-red-300 focus:bg-white focus:ring-2 focus:ring-red-300/60"
            : "ring-transparent focus:bg-white focus:ring-2 focus:ring-brand/25",
        ].join(" ")}
      />
      <span className="mt-1.5 flex flex-wrap items-center justify-between gap-2 px-1.5 text-[12px]">
        <span className={count > 0 && count < 50 ? "text-neutral-500" : "text-neutral-400"}>
          {count} words (minimum 50 required)
        </span>
        {error ? <span className="text-red-500">{error}</span> : null}
      </span>
    </label>
  );
}
