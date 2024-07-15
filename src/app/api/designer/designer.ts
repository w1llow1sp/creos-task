import {s} from "vite/dist/node/types.d-aGj9QkWt";
export interface Issue {
    "key": string
    "date_created":string
    "status": "Done" |  "In Progress" | "Now"
}

export interface IDesigner {
    "avatar": string
    "username": string
    "email": string
    "thumbnails": {
        "avatar": string
        "avatar_2x": string
        "avatar_webp": string
        "avatar_webp_2x": string
    },
    "issues": Array<Issue>
}
