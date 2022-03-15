import { Extent as olExtent } from 'ol/extent'

export class Extent {

    minX: number;
    minY: number;
    maxX: number;
    maxY: number;



    constructor(minX?: number, minY?: number, maxX?: number, maxY?: number) {

        this.minX = minX || 0;
        this.minY = minY || 0;
        this.maxX = maxX || 0;
        this.maxY = maxY || 0;
    }


    /**
     * check if Extent is valid
     * @return {boolean}
     */
    isValid(): boolean {
        return this.minX < this.maxX && this.minY < this.maxY;
    }


    /**
     * Increase the extent by addtionall Extent
     * @params {Extent} addExtent
     */
    increaseExtent(addExtent: Extent): void {

        // jump out if extent notprovided
        if (!addExtent) {
            return;
        }

        if (addExtent.minX !== undefined) {
            if (this.minX === undefined) {
                this.minX = addExtent.minX
            } else {
                this.minX = Math.min(this.minX, addExtent.minX)
            }
        }

        if (addExtent.minY !== undefined) {
            if (this.minY === undefined) {
                this.minY = addExtent.minY
            } else {
                this.minY = Math.min(this.minY, addExtent.minY)
            }
        }

        if (addExtent.maxX !== undefined) {
            if (this.maxX === undefined) {
                this.maxX = addExtent.maxX
            } else {
                this.maxX = Math.max(this.maxX, addExtent.maxX)
            }
        }

        if (addExtent.maxY !== undefined) {
            if (this.maxY === undefined) {
                this.maxY = addExtent.maxY
            } else {
                this.maxY = Math.max(this.maxY, addExtent.maxY)
            }
        }

        return;
    }


    /**
     * get the center of the Extent
     * @return {number[]}
     */
    getCenter(): number[] {
        return [(this.minX + this.maxX) / 2, (this.minY + this.maxY) / 2]
    }

    /**
     * return as an open layers Extent
     */
    asOlExtent(): olExtent {
        return [this.minX, this.minY, this.maxX, this.maxY]
    }

    /**
     * return as an open layers Extent
     */
    asBingBounds(): number[] {
        return [this.maxX, this.maxY, this.minX, this.minY]
    }

    /**
     * set this extent from ol extent
     * @param {olExtent} olExtent
     * @return {void}
     */
    setFromOlExtent(olExtent: olExtent): void {
        this.minX = olExtent[0];
        this.minY = olExtent[1];
        this.maxX = olExtent[2];
        this.maxY = olExtent[3];
    }

    /**
     * set this extent from ol extent
     * @param {number[]} bingBounds
     * @return {void}
     */
    setFromBingBounds(bingBounds: number[]): void {
        this.minX = bingBounds[2];
        this.minY = bingBounds[3];
        this.maxX = bingBounds[0];
        this.maxY = bingBounds[1];
    }


    /**
     * Get min coords in array
     * @returns {number[]}
     */
    getMinCoords(): number[] {
        return [this.minX, this.minY];
    }

    /**
     * Get max coords in array
     * @returns {number[]}
     */
    getMaxCoords(): number[] {
        return [this.maxX, this.maxY];
    }


}
