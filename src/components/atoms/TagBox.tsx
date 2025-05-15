import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { Text } from "./Text";
import { colors } from "../../constants/Colors";

interface TagBoxProps {
  tags: string[];
}

type TagItem = { tagText: string; width?: number };

export const TagBox: React.FC<TagBoxProps> = ({ tags }) => {
  const [tagBoxWidth, setTagBoxWidth] = useState(0);
  const itemsRef = useRef<TagItem[]>(tags.map((tagText) => ({ tagText })));
  const [flattenedItems, setFlattenedItems] = useState<TagItem[]>([]);

  const handleTagBoxLayout = useCallback((e: LayoutChangeEvent) => {
    setTagBoxWidth(e.nativeEvent.layout.width);
  }, []);

  const handleTextLayout = useCallback(
    (index: number, e: LayoutChangeEvent) => {
      itemsRef.current[index].width = Math.ceil(
        e.nativeEvent.layout.width + 12
      );

      if (itemsRef.current.every((item) => item.width)) {
        optimizeLayout();
      }
    },
    []
  );

  const optimizeLayout = useCallback(() => {
    if (!tagBoxWidth) return;

    const sortedItems = [...itemsRef.current].sort(
      (a, b) => (b.width || 0) - (a.width || 0)
    );

    const widths = sortedItems.map((item) => item.width!);
    const combinations = findAllClosestCombinations(widths, tagBoxWidth);
    const tagItemCombinations = combinations.map((comb) =>
      comb.map(
        (width) => itemsRef.current.find((item) => item.width === width)!
      )
    );

    const flattened = flattenCombinations(sortedItems, tagItemCombinations);
    setFlattenedItems(flattened);
  }, [tagBoxWidth]);

  const prevTagsRef = useRef(tags);
  
  useEffect(() => {
    if (tags.some((tag, i) => tag !== prevTagsRef.current[i])) {
      itemsRef.current = tags.map((tag) => ({ tagText: tag }));
    }
    prevTagsRef.current = tags;
  }, [tags]);

  useEffect(() => {
    optimizeLayout();
  }, [tagBoxWidth]);

  return (
    <View style={styles.tagBox} onLayout={(e) => handleTagBoxLayout(e)}>

      {flattenedItems.length === 0 &&
        tags.map((tag, index) => (
          <View
            key={index}
            style={styles.tag}
            onLayout={(e) => handleTextLayout(index, e)}
          >
            <Text
              variant="body"
              style={{ textAlign: "center", color: colors.textWhite }}
            >
              {"#" + tag}
            </Text>
          </View>
        ))}

      {flattenedItems.length !== 0 &&
        flattenedItems.map((item, index) => (
          <View key={`item-${index}`} style={styles.tag}>
            <Text
              variant="body"
              style={{ textAlign: "center", color: colors.textWhite }}
            >
              {"#" + item.tagText}
            </Text>
          </View>
        ))}
    </View>
  );
};

function flattenCombinations(
  original: TagItem[],
  combinations: TagItem[][]
): TagItem[] {
  const sorted = [...original].sort(
    (a, b) =>
      (b.width || 0) - (a.width || 0) ||
      original.indexOf(a) - original.indexOf(b)
  );

  const usedIndices = new Set<number>();
  const result: TagItem[] = [];

  combinations.forEach((combination) => {
    combination.forEach((item) => {
      const originalIndex = sorted.findIndex(
        (i, idx) => i.tagText === item.tagText && !usedIndices.has(idx)
      );
      if (originalIndex !== -1) {
        usedIndices.add(originalIndex);
        result.push(sorted[originalIndex]);
      }
    });
  });

  sorted.forEach((item, index) => {
    if (!usedIndices.has(index)) {
      result.push(item);
    }
  });

  return result;
}

function findAllClosestCombinations(
  numbers: number[],
  target: number
): number[][] {
  const results: number[][] = [];
  let minDiff = Infinity;

  const indexedNumbers = numbers.map((num, index) => ({ num, index }));

  indexedNumbers.sort((a, b) => b.num - a.num || a.index - b.index);

  function backtrack(start: number, current: number[], currentSum: number) {
    const diff = Math.abs(currentSum - target);

    if (diff < minDiff) {
      minDiff = diff;
      results.length = 0;
      results.push([...current]);
    } else if (diff === minDiff) {
      results.push([...current]);
    }

    if (minDiff === 0 || start >= indexedNumbers.length) return;

    for (let i = start; i < indexedNumbers.length; i++) {
      const { num } = indexedNumbers[i];
      current.push(num);
      backtrack(i + 1, current, currentSum + num);
      current.pop();
    }
  }

  backtrack(0, [], 0);
  return results;
}

const styles = StyleSheet.create({
  tagBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    paddingHorizontal: 8
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
});
