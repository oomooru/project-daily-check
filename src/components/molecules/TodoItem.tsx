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

type TagItem = { tagText: string; width?: number };

export const TodoItem: React.FC<TodoItemProps> = ({ 
  text, 
  completed,
  tags,
  onToggle,
  onDelete 
}) => {

  const [tagBoxWidth, setTagBoxWidth] = useState(0);
  const itemsRef = useRef<TagItem[]>(tags.map(tagText => ({ tagText })));
  const [flattenedItems, setFlattenedItems] = useState<TagItem[]>([]);

  // 1. 컨테이너 너비 측정
  const handleTagBoxLayout = useCallback((e: LayoutChangeEvent) => {
    setTagBoxWidth(e.nativeEvent.layout.width);
  }, []);

  // 2. 텍스트 너비 측정
  const handleTextLayout = useCallback((index: number, e: LayoutChangeEvent) => {

    itemsRef.current[index].width = Math.ceil(e.nativeEvent.layout.width + 12); // margin 고려
    
    // 모든 측정 완료 시 최적화 실행
    if (itemsRef.current.every(item => item.width)) {
      optimizeLayout();
    }
  }, []);

  // 3. 최적화 및 1차원 배열 생성
  const optimizeLayout = useCallback(() => {
    if (!tagBoxWidth) return;
  
    // 너비 기준 내림차순 정렬 (명시적)
    const sortedItems = [...itemsRef.current].sort(
      (a, b) => (b.width || 0) - (a.width || 0)
    );
  
    const widths = sortedItems.map(item => item.width!);
    const combinations = findAllClosestCombinations(widths, tagBoxWidth);
    const tagItemCombinations = combinations.map(
      comb => comb.map(
        width => itemsRef.current.find(item => item.width === width)!
      )
    );

    // 조합을 평탄화하면서도 큰 너비 우선 유지
    const flattened = flattenCombinations(sortedItems, tagItemCombinations);
    setFlattenedItems(flattened);

    console.log(`최종 계산된 TagBox 너비 : ${tagBoxWidth}`);
    console.log(`최종 계산된 Tag 너비 조합순 : ${flattened.map((tagItem) => tagItem.width)}`);
  }, [tagBoxWidth]);

  // 4. tags 변경 시 리셋
  const prevTagsRef = useRef(tags);
    useEffect(() => {
    if (tags.some((tag, i) => tag !== prevTagsRef.current[i])) {
      itemsRef.current = tags.map(tag => ({ tagText: tag }));
    }
    prevTagsRef.current = tags;
  }, [tags]);

  useEffect(() => {
    optimizeLayout();
  }, [tagBoxWidth]);

  return (
    <View style={styles.container}>

      <View style={styles.textBox}>
        <Text variant="body" style={completed ? styles.completedText : styles.text}>
          {text}
        </Text>
      </View>

      <View style={styles.tagBox} onLayout={(e) => handleTagBoxLayout(e)}>
        {/*<View style={{marginRight: 4, marginBottom: 4, justifyContent: 'center'}}>
          <SvgIcon name='IconClock' width={24} height={24} />
        </View>*/}

        {flattenedItems.length === 0 && tags.map((tag, index) => (
          <View key={index} style={styles.tag} onLayout={(e) => handleTextLayout(index, e)}>
            <Text
              variant="body"
              style={{textAlign: 'center', color: colors.textWhite}}
            >
              {'#' + tag}
            </Text>
          </View>
        ))}

        {flattenedItems.length !== 0 && flattenedItems.map((item, index) => (
          <View key={`item-${index}`} style={styles.tag}>
            <Text
              variant="body"
              style={{textAlign: 'center', color: colors.textWhite}}
            >
              {'#' + item.tagText}
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
  // 너비 내림차순 + 원본 순서 유지
  const sorted = [...original].sort((a, b) => 
    (b.width || 0) - (a.width || 0) || 
    original.indexOf(a) - original.indexOf(b)
  );

  const usedIndices = new Set<number>();
  const result: TagItem[] = [];

  combinations.forEach(combination => {
    combination.forEach(item => {
      const originalIndex = sorted.findIndex(
        (i, idx) => i.tagText === item.tagText && !usedIndices.has(idx)
      );
      if (originalIndex !== -1) {
        usedIndices.add(originalIndex);
        result.push(sorted[originalIndex]);
      }
    });
  });

  // 남은 아이템 추가 (너비 큰 순서대로)
  sorted.forEach((item, index) => {
    if (!usedIndices.has(index)) {
      result.push(item);
    }
  });

  return result;
}

function findAllClosestCombinations(numbers: number[], target: number): number[][] {
  const results: number[][] = [];
  let minDiff = Infinity;

  // 숫자와 원본 인덱스를 함께 저장
  const indexedNumbers = numbers.map((num, index) => ({ num, index }));
  
  // 너비 기준 내림차순 정렬 (동일 너비 시 원본 순서 유지)
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
    width: '100%'
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