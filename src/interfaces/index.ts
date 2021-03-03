export interface IStarCoords {
  x: number,
  y: number,
  vx: number;
  vy: number;
  radius: number;
}

export interface ISocialLink {
  id: string | number,
  name: string,
  image: string,
  link: string
}

export interface IEntity {
  id: string | number,
  title: string,
  description: string,
  start: string,
  end: string
}