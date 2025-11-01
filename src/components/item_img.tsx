export default function ItemImg({
  src,
  alt,
}: {
  src: string | undefined;
  alt: string | undefined;
}) {
  return (
    <figure className="flex items-center justify-center">
      {src ? (
        <img className="w-32" src={src} alt={alt} />
      ) : (
        <div className="h-32 p-5 text-center text-6xl">?</div>
      )}
    </figure>
  );
}
