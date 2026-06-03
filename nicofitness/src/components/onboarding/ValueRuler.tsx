import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  View,
} from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';

const ITEM_WIDTH = 14;

interface ValueRulerProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  formatLabel: (value: number) => string;
}

function offsetToValue(offsetX: number, min: number, max: number): number {
  const index = Math.round(offsetX / ITEM_WIDTH);
  return Math.min(max, Math.max(min, min + index));
}

export function ValueRuler({ min, max, value, onChange, formatLabel }: ValueRulerProps) {
  const listRef = useRef<FlatList<number>>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollingRef = useRef(false);
  const hasInitializedRef = useRef(false);

  const values = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    [min, max],
  );

  const sidePadding = containerWidth > 0 ? Math.max(0, (containerWidth - ITEM_WIDTH) / 2) : 0;

  const scrollToValue = useCallback(
    (next: number, animated: boolean) => {
      const index = Math.min(max - min, Math.max(0, next - min));
      listRef.current?.scrollToOffset({ offset: index * ITEM_WIDTH, animated });
    },
    [min, max],
  );

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  }, []);

  useEffect(() => {
    if (containerWidth <= 0 || hasInitializedRef.current) return;
    scrollToValue(value, false);
    hasInitializedRef.current = true;
  }, [containerWidth, scrollToValue, value]);

  const emitValue = useCallback(
    (offsetX: number) => {
      const next = offsetToValue(offsetX, min, max);
      if (next !== value) {
        onChange(next);
      }
    },
    [max, min, onChange, value],
  );

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      emitValue(e.nativeEvent.contentOffset.x);
    },
    [emitValue],
  );

  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollingRef.current = false;
      const next = offsetToValue(e.nativeEvent.contentOffset.x, min, max);
      onChange(next);
      scrollToValue(next, true);
    },
    [min, max, onChange, scrollToValue],
  );

  return (
    <View className="items-center">
      <Typography
        variant="title"
        style={{ fontFamily: fontFamily.bold, fontSize: 48, color: colors.foreground }}
        className="text-center">
        {formatLabel(value)}
      </Typography>
      <View className="relative mt-lg h-28 w-full" onLayout={onLayout}>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: containerWidth > 0 ? containerWidth / 2 - 1 : '50%',
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: colors.primary,
            zIndex: 10,
          }}
        />
        {containerWidth > 0 ? (
          <FlatList
            ref={listRef}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: sidePadding }}
            data={values}
            keyExtractor={(item) => String(item)}
            getItemLayout={(_, index) => ({
              length: ITEM_WIDTH,
              offset: ITEM_WIDTH * index,
              index,
            })}
            onScrollBeginDrag={() => {
              scrollingRef.current = true;
            }}
            onScroll={onScroll}
            onMomentumScrollEnd={onScrollEnd}
            onScrollEndDrag={onScrollEnd}
            renderItem={({ item }) => {
              const major = item % 10 === 0;
              const selected = item === value;
              return (
                <View style={{ width: ITEM_WIDTH }} className="items-center justify-end pb-2">
                  <View
                    style={{
                      width: major ? 2 : 1,
                      height: major ? 36 : 18,
                      backgroundColor: selected ? colors.primary : colors.border,
                    }}
                  />
                </View>
              );
            }}
          />
        ) : null}
      </View>
    </View>
  );
}
