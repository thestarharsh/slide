export type Keyword = {
    id: string;
    word: string;
};

export type InstagramPost = {
    id: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    timestamp: Date;
    caption?: string;
};
