export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-[20%] w-[40%] h-[40%] bg-tertiary/5 rounded-full blur-[80px]" />
    </div>
  );
}

