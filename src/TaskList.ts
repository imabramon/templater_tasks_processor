export class TaskList{
    public _data: any;

    constructor(md: string){
        this._data = this._parseMarkdown(md);
    }

    // deleteTags(tags){

    // }

    // addTags(tags){

    // }

    // replaceTags(oldTags, newTags){

    // }

    _parseMarkdown(md: string){
        return md;
    }

    // sortBy(fn){

    // }
}