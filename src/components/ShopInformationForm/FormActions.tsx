/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

export default function FormActions({
  onSubmit,
  onCancel,
  isLoading,
  clicks,
}: {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: any;
  clicks: any
}) {
  return (
    <div className="flex justify-end gap-3 pt-4">
      <button
        onClick={onCancel}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 bg-gray-900 hover:bg-gray-800 text-white"
      >
        {/* {isLoading ? 'Creating Shop...' : 'Create Shop'} */}
        {isLoading ? 'Creating Shop...' : clicks }
      </button>
    </div>
  );
}
