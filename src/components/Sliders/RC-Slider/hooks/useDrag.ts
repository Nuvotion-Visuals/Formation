import * as React from 'react';
import type { Direction, OnStartMove } from '../interface';
import type { OffsetValues } from './useOffset';

function getPosition(e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) {
  const obj = 'touches' in e ? e.touches[0] : e;

  return { pageX: obj.pageX, pageY: obj.pageY };
}

export default function useDrag(
  containerRef: React.RefObject<HTMLDivElement>,
  direction: Direction,
  rawValues: number[],
  min: number,
  max: number,
  formatValue: (value: number) => number,
  triggerChange: (values: number[]) => void,
  finishChange: () => void,
  offsetValues: OffsetValues,
): [number, number, number[], OnStartMove] {
  const [draggingValue, setDraggingValue] = React.useState(null);
  const [draggingIndex, setDraggingIndex] = React.useState(-1);
  const [cacheValues, setCacheValues] = React.useState(rawValues);
  const [originValues, setOriginValues] = React.useState(rawValues);

  const mouseMoveEventRef = React.useRef<(event: MouseEvent) => void>(null);
  const mouseUpEventRef = React.useRef<(event: MouseEvent) => void>(null);

  React.useEffect(() => {
    if (draggingIndex === -1) {
      setCacheValues(rawValues);
    }
  }, [rawValues, draggingIndex]);

  // Clean up event
  React.useEffect(
    () => () => {
  // @ts-ignore
      document.removeEventListener('mousemove', mouseMoveEventRef.current);
  // @ts-ignore
      document.removeEventListener('mouseup', mouseUpEventRef.current);
  // @ts-ignore
      document.removeEventListener('touchmove', mouseMoveEventRef.current);
  // @ts-ignore
      document.removeEventListener('touchend', mouseUpEventRef.current);
    },
    [],
  );

  const flushValues = (nextValues: number[], nextValue?: number) => {
    // Perf: Only update state when value changed
    if (cacheValues.some((val, i) => val !== nextValues[i])) {
      if (nextValue !== undefined) {
  // @ts-ignore
        setDraggingValue(nextValue);
      }
      setCacheValues(nextValues);
      triggerChange(nextValues);
    }
  };

  const updateCacheValue = (valueIndex: number, offsetPercent: number, overwriteValue?: number) => {
    // Basic point offset
    if (valueIndex === -1) {
      // Determine the closest index to overwriteValue
      const closestIndex = originValues?.reduce((prevIdx, currVal, currIdx) => {
  // @ts-ignore
        return Math.abs(currVal - overwriteValue) < Math.abs(originValues[prevIdx] - overwriteValue) ? currIdx : prevIdx
      }, 0)
    
      // Calculate the offset
      let offset = offsetPercent * (max - min)
    
      // Apply the offset to the overwriteValue
  // @ts-ignore
      let newValue = overwriteValue + offset
    
      // Format the new value
      newValue = formatValue(newValue)
    
      // Ensure the new value is within the range [min, max]
      newValue = Math.max(min, Math.min(max, newValue))
    
      const cloneCacheValues = [...originValues]
      cloneCacheValues[closestIndex] = newValue
    
      flushValues(cloneCacheValues)
    }
    
    else {
      // >>>> Dragging on the handle
      const offsetDist = (max - min) * offsetPercent;
    
      // Always start with the valueIndex origin value
      const cloneValues = [...cacheValues];
      cloneValues[valueIndex] = originValues[valueIndex];
    
      const next = offsetValues(cloneValues, offsetDist, valueIndex, 'dist');
    
      flushValues(next.values, next.value);
    }
  };

  // Resolve closure
  const updateCacheValueRef = React.useRef(updateCacheValue);
  updateCacheValueRef.current = updateCacheValue;

  const onStartMove: OnStartMove = (e, valueIndex, overwriteValue) => {
    e.stopPropagation();

    const originValue = rawValues[valueIndex];

    setDraggingIndex(valueIndex);
  // @ts-ignore
    setDraggingValue(originValue);
    setOriginValues(rawValues);

    const { pageX: startX, pageY: startY } = getPosition(e);

    // Moving
    const onMouseMove = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();

      const { pageX: moveX, pageY: moveY } = getPosition(event);
      const offsetX = moveX - startX;
      const offsetY = moveY - startY;

  // @ts-ignore
      const { width, height } = containerRef.current.getBoundingClientRect();

      let offSetPercent: number;
      switch (direction) {
        case 'btt':
          offSetPercent = -offsetY / height;
          break;

        case 'ttb':
          offSetPercent = offsetY / height;
          break;

        case 'rtl':
          offSetPercent = -offsetX / width;
          break;

        default:
          offSetPercent = offsetX / width;
      }
      updateCacheValueRef.current(valueIndex, offSetPercent, overwriteValue);
    };

    // End
    const onMouseUp = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
  // @ts-ignore
      mouseMoveEventRef.current = null;
  // @ts-ignore
      mouseUpEventRef.current = null;

      setDraggingIndex(-1);
      finishChange();
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);
    document.addEventListener('touchmove', onMouseMove);
  // @ts-ignore
    mouseMoveEventRef.current = onMouseMove;
  // @ts-ignore
    mouseUpEventRef.current = onMouseUp;
  };

  // Only return cache value when it mapping with rawValues
  const returnValues = React.useMemo(() => {
    const sourceValues = [...rawValues].sort((a, b) => a - b);
    const targetValues = [...cacheValues].sort((a, b) => a - b);

    return sourceValues.every((val, index) => val === targetValues[index])
      ? cacheValues
      : rawValues;
  }, [rawValues, cacheValues]);

  // @ts-ignore
  return [draggingIndex, draggingValue, returnValues, onStartMove];
}
