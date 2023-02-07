export function Iframe(props: { src: string; title: string }) {
  return (
    <div className="relative mb-2 h-0 w-full pb-[56.25%]">
      <iframe
        width="560"
        height="315"
        src={props.src}
        title={props.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      />
    </div>
  );
}
