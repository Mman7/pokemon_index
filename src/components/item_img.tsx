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
    <figure className="m-auto grid place-items-center rounded-xl bg-black/15">
      {src ? (
        <img
          className={`w-full ${imgClassName}`}
          loading="lazy"
          src={src}
          alt={alt}
        />
      ) : (
        <div className="grid size-38 justify-center justify-items-center p-6 text-center text-6xl">
          ?
        </div>
      )}
    </figure>
  );
}
