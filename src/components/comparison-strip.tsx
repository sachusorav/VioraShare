import { Check, X, AlertTriangle } from "lucide-react";

const rows = [
  {
    feature: "No login required",
    viora: "yes",
    whatsapp: "no",
    gdrive: "no",
    wetransfer: "no",
  },
  {
    feature: "Auto-deletes files",
    viora: "yes",
    whatsapp: "partial",
    gdrive: "no",
    wetransfer: "partial",
  },
  {
    feature: "Shared clipboard",
    viora: "yes",
    whatsapp: "no",
    gdrive: "no",
    wetransfer: "no",
  },
  {
    feature: "Zero personal data",
    viora: "yes",
    whatsapp: "no",
    gdrive: "no",
    wetransfer: "partial",
  },
];

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  return (
    <td
      className={`py-4 px-4 text-center ${
        highlight ? "bg-primary/10" : ""
      }`}
    >
      {value === "yes" ? (
        <Check className={`w-4 h-4 mx-auto ${highlight ? "text-primary" : "text-green-500"}`} />
      ) : value === "no" ? (
        <X className="w-4 h-4 mx-auto text-muted-foreground/40" />
      ) : (
        <AlertTriangle className="w-4 h-4 mx-auto text-yellow-500/70" />
      )}
    </td>
  );
}

export function ComparisonStrip() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-4">
        How we compare
      </p>
      <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40">
              <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider w-1/3">
                Feature
              </th>
              <th className="py-3 px-4 text-center text-xs font-bold text-primary uppercase tracking-wider bg-primary/10">
                VioraShare
              </th>
              <th className="py-3 px-4 text-center text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
                WhatsApp
              </th>
              <th className="py-3 px-4 text-center text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider hidden sm:table-cell">
                Google Drive
              </th>
              <th className="py-3 px-4 text-center text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider hidden sm:table-cell">
                WeTransfer
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {rows.map((row) => (
              <tr key={row.feature} className="hover:bg-muted/5 transition-colors">
                <td className="py-4 px-4 text-sm font-medium text-foreground/80">
                  {row.feature}
                </td>
                <Cell value={row.viora} highlight />
                <Cell value={row.whatsapp} />
                <td className="hidden sm:table-cell">
                  <Cell value={row.gdrive} />
                </td>
                <td className="hidden sm:table-cell">
                  <Cell value={row.wetransfer} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-center text-[10px] text-muted-foreground/30 mt-2">
        ⚠️ = partial / limited · ✓ = yes · ✗ = no
      </p>
    </div>
  );
}
