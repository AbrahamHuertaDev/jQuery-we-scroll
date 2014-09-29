jQuery-we-scroll
================

Jquery plugin to animate scroll

```html
<!-- 
  config the anchor 
  we-scroll: set the plugin
  we-maker: target to scroll
-->
<a href="javascript:;" we-scroll we-maker="bottom">scroll</a>
<!-- 
  target to scroll 
  we-target: same as we-maker  
-->
<div we-target="bottom">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
  Voluptates nesciunt animi maxime deserunt dolore aut doloremque odio rem ab, 
  quia velit laboriosam praesentium repellendus repellat at facilis. 
  Saepe, dolores in
</div>
```

```javascript
	jQuery('[we-scroll]').weScroll({
		speed: 2000,
		effect: 'easeOutBounce'
	});
```
