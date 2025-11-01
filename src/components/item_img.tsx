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
    <figure className="flex items-center justify-center rounded-xl bg-gray-200/50 dark:bg-black/15">
      {src ? (
        <img
          className={`${!imgClassName && "m-8"} w-32 ${imgClassName}`}
          src={src}
          alt={alt}
        />
      ) : (
        <div className="h-32 p-5 text-center text-6xl">?</div>
      )}
    </figure>
  );
}
