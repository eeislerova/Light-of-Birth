type WordmarkProps = {
  /** Base font size of the wordmark, any valid CSS length or clamp() */
  size?: string;
  /** Colour of the capital letters */
  inkClassName?: string;
  /** Colour of the italic "of" */
  accentClassName?: string;
  className?: string;
  as?: "span" | "h1" | "div";
};

/**
 * Text based recreation of the Light of Birth wordmark:
 * wide letterspaced serif capitals with a terracotta italic "of".
 */
export default function Wordmark({
  size = "1rem",
  inkClassName = "text-[#2c3a2f]",
  accentClassName = "text-[#c16a48]",
  className = "",
  as: Tag = "span",
}: WordmarkProps) {
  return (
    <Tag
      className={`font-serif inline-flex items-baseline whitespace-nowrap leading-none ${inkClassName} ${className}`}
      style={{ fontSize: size }}
      aria-label="Light of Birth"
    >
      {/* negative right margin compensates the trailing letter-spacing so the
          gaps around the italic "of" are optically identical */}
      <span
        className="font-light uppercase tracking-[0.22em]"
        style={{ marginRight: "-0.22em" }}
        aria-hidden="true"
      >
        Light
      </span>
      <span
        className={`${accentClassName} italic`}
        style={{
          fontSize: "1.18em",
          lineHeight: 0.8,
          marginLeft: "0.2em",
          marginRight: "0.2em",
        }}
        aria-hidden="true"
      >
        of
      </span>
      <span
        className="font-light uppercase tracking-[0.22em]"
        style={{ marginRight: "-0.22em" }}
        aria-hidden="true"
      >
        Birth
      </span>
    </Tag>
  );
}
