import { Button } from "@/components/ui/button";

const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"];
const sizes = ["xs", "sm", "default", "lg"];
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-3xl space-y-10">

        {/* Variants */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-700">Variants</h2>
          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </section>

        {/* Sizes */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-700">Sizes</h2>
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size}>
                {size}
              </Button>
            ))}
          </div>
        </section>

        {/* Icon Sizes */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-700">Icon Sizes</h2>
          <div className="flex flex-wrap items-center gap-3">
            {iconSizes.map((size) => (
              <Button key={size} size={size} aria-label={size}>
                ★
              </Button>
            ))}
          </div>
        </section>

        {/* Disabled State */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-700">Disabled</h2>
          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <Button key={variant} variant={variant} disabled>
                {variant}
              </Button>
            ))}
          </div>
        </section>

        {/* All Variants × All Sizes */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-700">All Variants × All Sizes</h2>
          <div className="space-y-3">
            {variants.map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {variant} / {size}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
