# qrcode-generator
Batch QR generator

## Usage
`qrcode-generator <FILE-PATH>`

It will take the JSON file input and generate QRs in the `out` folder as `png`.

### File format

```json
[
  {
    "name":"<NAME>"
    "data":<DATA>
  }
]
```
