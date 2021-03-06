import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrpService {

  private static getPaddingLeft(textJoinerWidth: number, textElementWidths) {
    return (
        ~~((textJoinerWidth * 0.31666666)
          - (textElementWidths.leftWithoutCenter + textElementWidths.halfCenter)))
      + 'px';
  }
  public separateAndAlign = (word, textMeasurer, textElements, textJoiner) => {
    this.setAlignmentPadding(word, textJoiner, textMeasurer);
    this.setContentOnTextElements(word, textElements);
    return {
      textJoiner: textJoiner,
      textElements: textElements
    };
  }

  private setContentOnTextElements(word, textElements) {
    const centerIndex = this.calculateOptimalRecognitionPoint(word);
    textElements.left.textContent = word.substr(0, centerIndex - 1);
    textElements.center.textContent = word.substr(centerIndex - 1, 1);
    textElements.right.textContent = word.substr(centerIndex);
  }

  private setAlignmentPadding(word, textJoiner: HTMLElement, textMeasurer) {
    const centerIndex = this.calculateOptimalRecognitionPoint(word);
    const textJoinerWidth = textJoiner.offsetWidth;

    const textElementWidths = {leftWithoutCenter: 0, leftWithCenter: 0, halfCenter: 0};

    textElementWidths.leftWithoutCenter = this.widthOf(word.substr(0, centerIndex - 1), textMeasurer);
    textElementWidths.leftWithCenter = this.widthOf(word.substr(0, centerIndex), textMeasurer);
    textElementWidths.halfCenter =
      (textElementWidths.leftWithCenter - textElementWidths.leftWithoutCenter) / 2;
    textJoiner.style.paddingLeft = OrpService.getPaddingLeft(textJoinerWidth, textElementWidths);
  }

  private calculateOptimalRecognitionPoint(word) {
    const length = word.length;
    if (length === 1) {
      return 1;
    } else if (length <= 5) {
      return 2;
    } else if (length <= 7) {
      return 3;
    } else if (length <= 9) {
      return 4;
    } else {
      return 5;
    }
  }

  widthOf(word, textMeasurer) {
    textMeasurer.textContent = word;
    return textMeasurer.offsetWidth;
  }
}
