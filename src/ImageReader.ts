/**
 * ImageReader
 */
import {FileNotFoundException} from "./Exceptions";

export class ImageReader {
    private filePath: string;

    /**
     *
     * @param imgName
     */
    constructor(imgName: string) {
        this.load(imgName);
    }

    /**
     *
     * @param imgName
     */
    private load(imgName: string): void {

        this.filePath = __dirname + '/../images/' + imgName + '.jpg';
        const fs = require('fs');

        if (!fs.existsSync(this.filePath)) {
            throw new FileNotFoundException(`Could not find the file matching path : {$imagePath}`)
        }
    }

    /**
     *
     * @param width
     * @param height
     * @param ignoreAspectRatio
     */
    public resize(width: number, height: number, ignoreAspectRatio: boolean): Promise<Blob> {
        const sharp = require('sharp');


        let sharpFile = sharp(this.filePath);

        let fit = sharp.fit.inside;

        if (true === ignoreAspectRatio) {
            fit = sharp.fit.fill;
        }

        return sharpFile
            .resize(width, height, {
                fit: fit,
                withoutEnlargement: true
            })
            .toBuffer();
    }
}