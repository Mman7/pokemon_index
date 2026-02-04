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
    <figure className="flex items-center justify-center rounded-xl bg-black/15">
      {src ? (
        <img
          className={`w-full ${imgClassName}`}
          loading="lazy"
          src={src}
          alt={alt}
        />
      ) : (
        <div className="grid h-38 w-38 justify-center justify-items-center p-6 text-center text-6xl">
          ?
        </div>
      )}
    </figure>
  );
}
