export default function ItemCardSkeleton() {
  const defaultStyle = "skeleton ml-auto bg-gray-300 dark:bg-gray-700";
  return (
    <div className="flex w-52 flex-col gap-4">
      <div className={`${defaultStyle} h-32 w-full`}></div>
      <div className={`${defaultStyle} h-8 w-full`}></div>
      <div className={`${defaultStyle} h-8 w-full`}></div>
    </div>
  );
}
