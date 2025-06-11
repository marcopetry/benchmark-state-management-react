import { HomeCard } from "./home-card";
import styles from "./home-page.module.css";

const libs = [
  {
    name: "React Context API",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    githubUrl: "https://react.dev/learn/passing-data-deeply-with-context",
  },
  {
    name: "Zustand",
    logoUrl:
      "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
    githubUrl: "https://github.com/pmndrs/zustand",
  },
  {
    name: "Jotai",
    logoUrl: "	https://cdn.candycode.com/jotai/jotai-mascot.png",
    githubUrl: "https://github.com/pmndrs/jotai",
  },
  {
    name: "Valtio",
    logoUrl:
      "https://blog.openreplay.com/images/state-management-in-react-with-valtio/images/hero.png",
    githubUrl: "https://github.com/pmndrs/valtio",
  },
  {
    name: "Recoil",
    logoUrl: "https://recoiljs.org/img/logo.svg",
    githubUrl: "https://github.com/facebookexperimental/Recoil",
  },
  {
    name: "Effector",
    logoUrl: "https://effector.dev/favicon.svg",
    githubUrl: "https://github.com/effector/effector",
  },
  {
    name: "Redux Toolkit",
    logoUrl: "https://redux.js.org/img/redux.svg",
    githubUrl: "https://github.com/reduxjs/redux-toolkit",
  },
  {
    name: "Rematch",
    logoUrl: "https://rematchjs.org/img/logo.svg",
    githubUrl: "https://github.com/rematch/rematch",
  },
  {
    name: "Hookstate",
    logoUrl: "https://hookstate.js.org/img/logo.svg",
    githubUrl: "https://github.com/avkonst/hookstate",
  },
  {
    name: "RxJS",
    logoUrl:
      "https://rxjs.dev/generated/images/marketing/home/Rx_Logo-512-512.png",
    githubUrl: "https://github.com/ReactiveX/rxjs",
  },
  {
    name: "XState",
    logoUrl: "https://stately.ai/logo-black.svg",
    githubUrl: "https://github.com/statelyai/xstate",
  },
  {
    name: "Robot3",
    logoUrl: "https://thisrobot.life/images/robot-mono.png",
    githubUrl: "https://github.com/matthewp/robot",
  },
  {
    name: "use-context-selector",
    logoUrl: "https://avatars.githubusercontent.com/u/69631?s=200&v=4",
    githubUrl: "https://github.com/dai-shi/use-context-selector",
  },
  {
    name: "Constate",
    logoUrl:
      "https://raw.githubusercontent.com/diegohaz/constate/master/logo/logo.png",
    githubUrl: "https://github.com/diegohaz/constate",
  },
];

export const HomePage = () => (
  <div className={styles.grid}>
    {libs.map((lib) => (
      <HomeCard key={lib.name} {...lib} />
    ))}
  </div>
);
