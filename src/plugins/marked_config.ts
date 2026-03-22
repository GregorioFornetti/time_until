// Make marked links open in new tab
import { marked } from 'marked'

const renderer = new marked.Renderer()

renderer.link = function( {href, text, title} ) {
  return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>';
}

marked.setOptions({
  renderer
})