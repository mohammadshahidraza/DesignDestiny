import { useState, type FocusEvent } from "react"

const controlClass =
  "w-full border-b border-white/15 bg-transparent pb-3 pt-6 text-white outline-none transition-colors focus:border-amber"

const labelClass = (floated: boolean) =>
  `pointer-events-none absolute left-0 transition-all duration-300 ease-expo ${
    floated ? "top-0 text-[11px] font-medium uppercase tracking-[0.2em] text-amber" : "top-6 text-base text-white/40"
  }`

function useFieldState() {
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0
  const onFocus = (_e: FocusEvent) => setFocused(true)
  const onBlur = (_e: FocusEvent) => setFocused(false)
  return { value, setValue, floated, onFocus, onBlur }
}

type Base = { id: string; name: string; label: string; required?: boolean; autoComplete?: string }

export function InputField({
  id,
  name,
  label,
  required,
  autoComplete,
  type = "text",
}: Base & { type?: string }) {
  const { value, setValue, floated, onFocus, onBlur } = useFieldState()
  return (
    <div className="relative">
      <label htmlFor={id} className={labelClass(floated)}>
        {label}
        {required && <span className="text-amber"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={controlClass}
      />
    </div>
  )
}

export function SelectField({
  id,
  name,
  label,
  required,
  options,
}: Base & { options: string[] }) {
  const { value, setValue, floated, onFocus, onBlur } = useFieldState()
  return (
    <div className="relative">
      <label htmlFor={id} className={labelClass(floated)}>
        {label}
        {required && <span className="text-amber"> *</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`${controlClass} cursor-pointer appearance-none pr-8`}
      >
        <option value="" disabled hidden />
        {options.map((option) => (
          <option key={option} value={option} className="bg-black text-white">
            {option}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        width={14}
        height={14}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute bottom-4 right-2 text-white/40"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}

export function TextareaField({ id, name, label, required }: Base) {
  const { value, setValue, floated, onFocus, onBlur } = useFieldState()
  return (
    <div className="relative">
      <label htmlFor={id} className={labelClass(floated)}>
        {label}
        {required && <span className="text-amber"> *</span>}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`${controlClass} resize-none`}
      />
    </div>
  )
}
