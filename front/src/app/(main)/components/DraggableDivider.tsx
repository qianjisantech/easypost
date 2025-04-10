import { useState, useRef, useEffect } from 'react';
import { Divider } from 'antd';

export function DraggableDivider({ onDrag }: { onDrag: (deltaY: number) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onDrag(e.movementY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDrag]);

  return (
    <Divider
      ref={dividerRef}
      style={{
        cursor: 'row-resize',
        margin: '8px 0',
        backgroundColor: isDragging ? '#1890ff' : undefined,
      }}
      onMouseDown={() => setIsDragging(true)}
    />
  );
}