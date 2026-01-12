# Justfile for nodejs

set shell := ["fish", "-c"]

dev *args:
    @deno task dev "{{args}}"
