export type EntityState = {
    owner: number; // InteractiveEntity
    keyword: number; // Keyword
    style: number; // Style
    sound: number; // Sound
}
// here on the front end will be reused for different entities. On the backend must be unique for each entity ( separate table)