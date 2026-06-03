import { useWindowDimensions, View } from 'react-native';
import Svg, { Ellipse, G, Line, Path, Rect } from 'react-native-svg';

export type BodyPose = 'front' | 'back';

interface BodyPoseOverlayProps {
  pose: BodyPose;
}

/**
 * Guías SVG de alineación para capturas frontales y de espalda.
 * Ayuda a mantener distancia y ángulo consistentes entre sesiones.
 */
export function BodyPoseOverlay({ pose }: BodyPoseOverlayProps) {
  const { width, height } = useWindowDimensions();
  const frameHeight = height * 0.78;

  return (
    <View
      className="absolute inset-0 items-center justify-center"
      pointerEvents="none"
      accessibilityElementsHidden>
      <Svg width={width} height={frameHeight} viewBox="0 0 360 640">
        <G opacity={0.9}>
          {/* Marco de encuadre */}
          <Rect
            x={48}
            y={40}
            width={264}
            height={560}
            rx={20}
            stroke="#22D3EE"
            strokeWidth={2}
            strokeDasharray="10 8"
            fill="none"
          />

          {/* Línea central de simetría */}
          <Line
            x1={180}
            y1={56}
            x2={180}
            y2={584}
            stroke="#22D3EE"
            strokeWidth={1}
            strokeDasharray="6 6"
            opacity={0.5}
          />

          {/* Cabeza */}
          <Ellipse
            cx={180}
            cy={108}
            rx={36}
            ry={44}
            stroke="#F97316"
            strokeWidth={2}
            fill="rgba(34, 211, 238, 0.08)"
          />

          {/* Hombros */}
          <Line
            x1={108}
            y1={168}
            x2={252}
            y2={168}
            stroke="#22D3EE"
            strokeWidth={2}
            opacity={0.85}
          />

          {pose === 'front' ? (
            <FrontSilhouette />
          ) : (
            <BackSilhouette />
          )}

          {/* Pie / posición */}
          <Ellipse
            cx={180}
            cy={548}
            rx={52}
            ry={14}
            stroke="#71717A"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="none"
          />
        </G>
      </Svg>

      <View className="absolute bottom-[18%] rounded-pill border border-primary/40 bg-background/70 px-md py-xs">
        <View className="items-center">
          <View className="h-1 w-16 rounded-pill bg-primary/60" />
        </View>
      </View>
    </View>
  );
}

function FrontSilhouette() {
  return (
    <G>
      <Path
        d="M 180 152 L 148 220 L 132 340 L 128 480 L 148 520 L 180 532 L 212 520 L 232 480 L 228 340 L 212 220 Z"
        stroke="#22D3EE"
        strokeWidth={2}
        fill="rgba(34, 211, 238, 0.06)"
      />
      <Line x1={148} y1={220} x2={120} y2={300} stroke="#22D3EE" strokeWidth={1.5} opacity={0.6} />
      <Line x1={212} y1={220} x2={240} y2={300} stroke="#22D3EE" strokeWidth={1.5} opacity={0.6} />
      <Ellipse cx={168} cy={100} rx={4} ry={4} fill="#F97316" opacity={0.8} />
      <Ellipse cx={192} cy={100} rx={4} ry={4} fill="#F97316" opacity={0.8} />
    </G>
  );
}

function BackSilhouette() {
  return (
    <G>
      <Path
        d="M 180 152 L 150 218 L 136 338 L 140 470 L 156 518 L 180 530 L 204 518 L 220 470 L 224 338 L 210 218 Z"
        stroke="#F97316"
        strokeWidth={2}
        fill="rgba(249, 115, 22, 0.06)"
      />
      {/* Línea de columna */}
      <Line
        x1={180}
        y1={160}
        x2={180}
        y2={500}
        stroke="#F97316"
        strokeWidth={1.5}
        strokeDasharray="4 6"
        opacity={0.7}
      />
      {/* Omóplatos */}
      <Path
        d="M 148 200 Q 180 188 212 200"
        stroke="#22D3EE"
        strokeWidth={1.5}
        fill="none"
        opacity={0.75}
      />
      <Path
        d="M 156 240 Q 180 252 204 240"
        stroke="#22D3EE"
        strokeWidth={1.5}
        fill="none"
        opacity={0.6}
      />
    </G>
  );
}
