from PIL import Image
import base64

# Classic pointer (white with black border)
pointer_pixels = [
    "B               ",
    "BB              ",
    "BWB             ",
    "BWWB            ",
    "BWWWB           ",
    "BWWWWB          ",
    "BWWWWWB         ",
    "BWWWWWWB        ",
    "BWWWWWWWB       ",
    "BWWWWWWWWB      ",
    "BWWWWWWWWWB     ",
    "BWWWWWWWWWWB    ",
    "BWWWWWWWWWWWB   ",
    "BWWWWWWWWWWWWB  ",
    "BWWWWWWBBBBBBBB ",
    "BWWWWBWB        ",
    "BWWWB BWB       ",
    "BWWB  BWB       ",
    "BWB    BWB      ",
    "BB     BWB      ",
    "B       BWB     ",
    "        BB      "
]

# Classic hand (white with black border)
hand_pixels = [
    "      BB        ",
    "     BWWBB      ",
    "     BWWWB      ",
    "     BWWWB      ",
    "     BWWWB      ",
    "     BWWWB      ",
    "   BBBWBBWBB    ",
    "  BWWBBWWBBWB   ",
    " BWWBWWWBBWWB   ",
    " BWWWWWWWWWWBB  ",
    " BWBBWWWWWWWWB  ",
    " BB BWWWWWWWWB  ",
    "     BWWWWWWWB  ",
    "     BWWWWWWWB  ",
    "      BWWWWWWB  ",
    "      BWWWWWWB  ",
    "       BWWWWWB  ",
    "       BWWWWWB  ",
    "       BBBBBBB  "
]

def create_image(pixels_array, filename):
    height = len(pixels_array)
    width = len(pixels_array[0])
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            if x < len(pixels_array[y]):
                char = pixels_array[y][x]
                if char == 'B':
                    pixels[x, y] = (0, 0, 0, 255)
                elif char == 'W':
                    pixels[x, y] = (255, 255, 255, 255)
                    
    img.save(filename)

create_image(pointer_pixels, 'public/cursor-retro.png')
create_image(hand_pixels, 'public/cursor-retro-hand.png')
print("Cursors created!")
