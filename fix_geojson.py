import json

def signed_area(ring):
    s = 0
    for i in range(len(ring) - 1):
        x1, y1 = ring[i][0], ring[i][1]
        x2, y2 = ring[i + 1][0], ring[i + 1][1]
        s += x1 * y2 - x2 * y1
    return s / 2

def fix_polygon(rings):
    fixed = []
    for i, ring in enumerate(rings):
        area = signed_area(ring)
        if i == 0:
            fixed.append(ring[::-1] if area > 0 else ring)
        else:
            fixed.append(ring[::-1] if area < 0 else ring)
    return fixed

with open("data/states.geojson", encoding="utf-8") as f:
    gj = json.load(f)

for feat in gj["features"]:
    geom = feat["geometry"]
    if geom["type"] == "Polygon":
        geom["coordinates"] = fix_polygon(geom["coordinates"])
    elif geom["type"] == "MultiPolygon":
        geom["coordinates"] = [fix_polygon(p) for p in geom["coordinates"]]

with open("data/states_cw.geojson", "w", encoding="utf-8") as f:
    json.dump(gj, f)

print("finish, generated data/states_cw.geojson")