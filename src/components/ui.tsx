import clsx from "clsx";
import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("rounded-3xl border border-white/10 bg-slate-950/40 shadow-soft backdrop-blur", className)}>{children}</div>;
}

export function StatCard({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) {
  return (
    <Card className="p-6">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-white">{value}</p>
      {subtitle ? <p className="mt-2 text-xs text-slate-500">{subtitle}</p> : null}
    </Card>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={clsx("w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20", props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={clsx("min-h-[120px] w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20", props.className)} />;
}

export function Btn(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={clsx("inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50", props.className)} />;
}

export function SecondaryBtn(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={clsx("inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10", props.className)} />;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full bg-white/8 px-2.5 py-1 text-xs text-slate-300">{children}</span>;
}