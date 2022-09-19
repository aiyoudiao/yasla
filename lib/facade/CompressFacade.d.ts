interface IFacade {
    compress(typeName: string): IFacade;
}
declare class CompressFacade implements IFacade {
    private img;
    private video;
    private music;
    compress(typeName: string): this;
}
export default CompressFacade;
