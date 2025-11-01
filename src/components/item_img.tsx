export default function ItemImg({
  src,
  alt,
  imgClassName,
}: {
  src: string | undefined;
  alt: string | undefined;
  imgClassName?: string;
}) {
  return (
    <figure className="flex items-center justify-center rounded-xl bg-gray-200/50 dark:bg-black/20">
      {src ? (
        <img className={`w-32 ${imgClassName}`} src={src} alt={alt} />
      ) : (
        <div className="h-32 p-5 text-center text-6xl">?</div>
      )}
    </figure>
  );
}
