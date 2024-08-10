import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  loading: boolean
}

export default function ExpensesSection({ title, children, loading }: Props) {
  return (
    <>
      <div className="flex justify-between px-4">
          <h2 className="text-xl text-slate-400 mb-6">{title}</h2>
      </div>
      <div className="bg-gray-700 rounded-lg text-center mb-8 p-4">
        {loading ? <p>Cargando...</p> : children}
      </div>
    </>
  );
}
