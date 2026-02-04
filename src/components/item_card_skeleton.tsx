export default function ItemCardSkeleton() {
  const defaultStyle = "skeleton ml-auto bg-gray-300 dark:bg-gray-700";
  return (
    <div className="flex flex-col gap-4">
      <div className={`${defaultStyle} h-50 w-full`}></div>
      <div className={`${defaultStyle} h-8 w-full`}></div>
    </div>
  );
}
