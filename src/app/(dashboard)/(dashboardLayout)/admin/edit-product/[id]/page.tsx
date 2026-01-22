import EditProductForm from "@/components/forms/EditProductForm";
import { useAppDispatch } from "@/redux/hooks";


type PageProps = {
  params: Promise<{ id: string }>;
};


export default async function page({ params }: PageProps) {
  const { id } = await params;
 


  return (
    <div className="py-6 p-2 sm:p-4">
      <div
        className="flex flex-col xl:flex-row items-center justify-between 
      mb-6 gap-4"
      >
        <div className="text-2xl font-semibold">Edit Product</div>
        
      </div>
      < EditProductForm id={id} />
    </div>
  );
}
