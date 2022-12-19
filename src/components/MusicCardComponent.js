import { MusicListComponent } from "./MusicListComponent";

export function MusicCardComponent(props) {

  const { title, subtitle, share } = props;
  return (
    <li>
      <article>
        <span>{title}</span>
        <span>{subtitle}</span>
        <img src={share} alt="song avatar" />
      </article>


    </li>
  );

}
