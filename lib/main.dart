import 'dart:async';
import 'dart:ui';

import 'package:flame/components.dart';
import 'package:flame/events.dart';
import 'package:flame/game.dart';
import 'package:flame/input.dart';
import 'package:flutter/material.dart';

import 'player.dart';

void main() {
  runApp(
    MaterialApp(
      home: const ShaderPage(),
    ),
  );
}

class ShaderPage extends StatefulWidget {
  const ShaderPage({super.key});

  @override
  State<ShaderPage> createState() => _ShaderPageState();
}

class _ShaderPageState extends State<ShaderPage> {
  final game = ShaderGame();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Shader'),
      ),
      body: GameWidget(game: game),
    );
  }
}

class ShaderGame extends FlameGame
    with MouseMovementDetector, MultiTouchDragDetector, HasCollisionDetection {
  late final FragmentProgram _program2;
  late final FragmentShader bgShader;
  late final Player player;
  late final Player player2;

  double time = 0;

  // Get pointer input
  @override
  void onMouseMove(PointerHoverInfo info) {
    updateMousePosition(info.eventPosition.global);
  }

  void updateMousePosition(Vector2 position) {
    player.move = position - player.position;
    player.speed = Vector2.zero();
  }

  // Get touch input
  @override
  void onDragUpdate(int pointerId, DragUpdateInfo info) {
    updateMousePosition(info.eventPosition.widget);
  }

  @override
  Future<void>? onLoad() async {
    _program2 = await FragmentProgram.fromAsset('shaders/bg.frag');
    bgShader = _program2.fragmentShader();
    player = Player();
    player.position = Vector2.all(400);
    player.size = Vector2.all(100);
    add(player);
    player2 = Player();
    player2.position = Vector2.all(200);
    player2.size = Vector2.all(100);
    add(player2);

    add(ScreenHitbox());
  }

  @override
  void render(Canvas canvas) {
    bgShader
      ..setFloat(0, size.x)
      ..setFloat(1, size.y)
      ..setFloat(2, time);

    canvas.drawRect(Offset.zero & size.toSize(), Paint()..shader = bgShader);
    super.render(canvas);
  }

  @override
  void update(double dt) {
    super.update(dt);
    time += dt;
  }
}
