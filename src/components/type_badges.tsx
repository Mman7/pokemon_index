export function TypeBadges({
  type,
  fontSize: className,
}: {
  type: string;
  fontSize: string;
}) {
  const defaultStyle = `badge capitalize font-medium p-3  ${className}`;
  switch (type) {
    case "poison":
      return <div className={`badge-primary ${defaultStyle}`}>{type}</div>;
    case "grass":
      return <div className={`badge-success ${defaultStyle}`}>{type}</div>;
    case "fire":
      return <div className={`badge-error ${defaultStyle}`}>{type}</div>;
    case "water":
      return <div className={`badge-info ${defaultStyle}`}>{type}</div>;
    case "electric":
      return <div className={`badge-warning ${defaultStyle}`}>{type}</div>;
    case "ice":
      return (
        <div className={`bg-sky-200 text-black ${defaultStyle}`}>{type}</div>
      );
    case "bug":
      return <div className={`badge-accent ${defaultStyle}`}>{type}</div>;
    case "ground":
      return <div className={`bg-yellow-700 ${defaultStyle}`}>{type}</div>;
    case "rock":
      return <div className={`bg-yellow-800 ${defaultStyle}`}>{type}</div>;
    case "dragon":
      return <div className={`bg-violet-400 ${defaultStyle}`}>{type}</div>;
    case "fighting":
      return <div className={`bg-yellow-700 ${defaultStyle}`}>{type}</div>;
    case "flying":
      return (
        <div className={`bg-sky-300 ${defaultStyle} text-black`}>{type}</div>
      );
    case "fairy":
      return <div className={`badge-secondary ${defaultStyle}`}>{type}</div>;
    case "psychic":
      return <div className={`badge-secondary ${defaultStyle}`}>{type}</div>;
    case "normal":
      return (
        <div className={`bg-gray-500 text-white ${defaultStyle}`}>{type}</div>
      );
    default:
      return (
        <div className={`badge badge-neutral ${defaultStyle}`}>{type}</div>
      );
  }
}
