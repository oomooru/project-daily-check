import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { Text } from '../atoms/Text';
import { colors } from '../../constants/Colors';
import SvgIcon from '../atoms/SvgIcon';

interface TodoItemProps {
  text: string;
  completed: boolean;
  tags: string[];
  onToggle: () => void;
  onDelete: () => void;
}

type TagItem = { text: string; width?: number };

export const TodoItem: React.FC<TodoItemProps> = ({ 
  text, 
  completed,
  tags,
  onToggle, 
  onDelete 
}) => {

  const [tagBoxWidth, setTagBoxWidth] = useState(0);
  const itemsRef = useRef<TagItem[]>(tags.map(text => ({ text })));
  const [flattenedItems, setFlattenedItems] = useState<TagItem[]>([]);

  // 1. 컨테이너 너비 측정
  const handleTagBoxLayout = useCallback((e: LayoutChangeEvent) => {
    setTagBoxWidth(e.nativeEvent.layout.width);
  }, []);

  // 2. 텍스트 너비 측정
  const handleTextLayout = useCallback((index: number, e: LayoutChangeEvent) => {
    itemsRef.current[index].width = e.nativeEvent.layout.width + 16; // padding 고려
    
    // 모든 측정 완료 시 최적화 실행
    if (itemsRef.current.every(item => item.width)) {
      optimizeLayout();
    }
  }, []);

  // 3. 최적화 및 1차원 배열 생성
  const optimizeLayout = useCallback(() => {
    if (!tagBoxWidth) return;

    const widths = itemsRef.current.map(item => item.width!);
    const combinations = findAllClosestCombinations(widths, tagBoxWidth);
    const tagItemCombinations = combinations.map(
      comb => comb.map(
        width => itemsRef.current.find(item => item.width === width)!
      )
    );

    // 2차원 조합을 1차원으로 평탄화 (원본 순서 유지)
    const flattened = flattenCombinations(itemsRef.current, tagItemCombinations);
    setFlattenedItems(flattened);
  }, [tagBoxWidth]);

  // 4. tags 변경 시 리셋
  useEffect(() => {
    itemsRef.current = tags.map(tag => ({ text }));
    setFlattenedItems([]);
  }, [tags]);

  return (
    <View style={styles.container}>

      {/*<Checkbox checked={completed} onToggle={onToggle} />*/}

      <View style={styles.textBox}>
        <Text variant="body" style={completed ? styles.completedText : styles.text}>
          {text}
        </Text>
      </View>

      <View style={styles.tagBox} onLayout={handleTagBoxLayout}>
        {/*<View style={{marginRight: 4, marginBottom: 4, justifyContent: 'center'}}>
          <SvgIcon name='IconClock' width={24} height={24} />
        </View>*/}

        {flattenedItems.length === 0 && (
          <View style={styles.hiddenMeasureView}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text
                  variant="body"
                  style={{textAlign: 'center', color: colors.textWhite}}
                  onLayout={(e) => handleTextLayout(index, e)}
                >
                  {'#' + tag}
                </Text>
              </View>
            ))}
          </View>
        )}

        {flattenedItems.map((item, index) => (
          <View key={`item-${index}`} style={styles.tag}>
            <Text
              variant="body"
              style={{textAlign: 'center', color: colors.textWhite}}
            >
              {'#' + item.text}
            </Text>
          </View>
        ))}

        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      </View>    

    </View>
  )
};

function flattenCombinations(
  original: TagItem[],
  combinations: TagItem[][]
): TagItem[] {
  const usedIndices = new Set<number>();
  const result: TagItem[] = [];

  combinations.forEach(combination => {
    combination.forEach(item => {
      const originalIndex = original.findIndex(
        (i, idx) => i.text === item.text && !usedIndices.has(idx)
      );
      if (originalIndex !== -1) {
        usedIndices.add(originalIndex);
        result.push(original[originalIndex]);
      }
    });
  });

  // 사용되지 않은 아이템 추가
  original.forEach((item, index) => {
    if (!usedIndices.has(index)) {
      result.push(item);
    }
  });

  return result;
}

function findAllClosestCombinations(numbers: number[], target: number): number[][] {
  const results: number[][] = [];
  let minDiff = Infinity;
  const used = new Array(numbers.length).fill(false);

  function backtrack(start: number, current: number[], currentSum: number) {
    const diff = Math.abs(currentSum - target);

    if (diff < minDiff) {
      minDiff = diff;
      results.length = 0;
      results.push([...current]);
    } else if (diff === minDiff) {
      results.push([...current]);
    }

    if (minDiff === 0 || start >= numbers.length) return;

    for (let i = start; i < numbers.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      current.push(numbers[i]);

      backtrack(i + 1, current, currentSum + numbers[i]);

      current.pop();
      used[i] = false;
    }
  }

  numbers.sort((a, b) => b - a);
  backtrack(0, [], 0);

  return results;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    paddingBottom: 4,
    backgroundColor: colors.primary,
    borderRadius: 16,
  },
  textBox: {
    flex: 1,
    width: '100%',
    padding: 8,
    marginBottom: 8,
    backgroundColor: colors.secondary,
    borderRadius: 8
  },
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  hiddenMeasureView: { 
    opacity: 0, 
    position: 'absolute' 
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: colors.textWhite
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
    backgroundColor: colors.secondary,
    borderRadius: 8
  },
  completedText: {
    flex: 1,
    textDecorationLine: 'line-through',
    color: colors.secondary,
    marginLeft: 12
  },
  deleteText: {
    fontSize: 24,
    color: colors.secondary
  }
});