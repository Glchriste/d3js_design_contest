// Generated by CoffeeScript 1.6.3
(function() {
  var BubbleChart, ParallelCoords, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Array.prototype.toDict = function(key) {
    var dict, obj, _i, _len;
    dict = {};
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      obj = this[_i];
      if (obj[key] != null) {
        dict[obj[key]] = obj;
      }
    }
    return dict;
  };

  ParallelCoords = (function() {
    function ParallelCoords(data) {
      this.create_vis = __bind(this.create_vis, this);
      this.unselect = __bind(this.unselect, this);
      this.select = __bind(this.select, this);
      this.hide_details = __bind(this.hide_details, this);
      this.show_details = __bind(this.show_details, this);
      this.create_nodes = __bind(this.create_nodes, this);
      this.getScale = __bind(this.getScale, this);
      var max_amount;
      this.data = data;
      this.parWidth = 1000;
      this.parHeight = 300;
      this.width = 300;
      this.height = 300;
      this.nodes = [];
      this.nodeDict = null;
      this.lines = [];
      this.columns = 10;
      this.axis = d3.svg.axis().orient("left");
      this.scales = {
        "Calories": d3.scale.linear().domain([50, 160]).range([this.parHeight - 30, 30]),
        "Protein": d3.scale.linear().domain([0, 6]).range([30, this.parHeight - 30]),
        "Fat": d3.scale.linear().domain([0, 5]).range([30, this.parHeight - 30]),
        "Sodium": d3.scale.linear().domain([0, 325]).range([30, this.parHeight - 30]),
        "Fiber": d3.scale.linear().domain([0, 15]).range([30, this.parHeight - 30]),
        "Carbohydrates": d3.scale.linear().domain([0, 24]).range([30, this.parHeight - 30]),
        "Sugars": d3.scale.linear().domain([0, 15]).range([30, this.parHeight - 30]),
        "Potassium": d3.scale.linear().domain([0, 330]).range([30, this.parHeight - 30]),
        "Vitamins": d3.scale.linear().domain([0, 100]).range([30, this.parHeight - 30]),
        "Manufacturer": d3.scale.ordinal().domain(["A", "G", "N", "P", "K", "Q", "R"]).rangePoints([30, this.parHeight - 30])
      };
      this.color = d3.scale.ordinal().domain(["A", "G", "N", "P", "K", "Q", "R"]).range(colorbrewer.Paired[7]);
      this.force = d3.layout.force().charge(-120).linkDistance(30).friction(0.8).size([this.width, this.height]);
      this.line = d3.svg.line().x(function(d) {
        return d.x;
      }).y(function(d) {
        return d.y;
      });
      max_amount = d3.max(this.data, function(d) {
        return parseInt(d.Calories);
      });
      this.radius_scale = d3.scale.pow().exponent(4).domain([0, max_amount]).range([10, 85]);
      this.create_nodes();
      this.create_vis();
    }

    ParallelCoords.prototype.getScale = function(name, d) {
      var scale;
      scale = this.scales[String(name)];
      if (typeof d === "undefined") {
        console.log(name);
      }
      if (typeof d === "string") {
        return scale(d);
      } else {
        return scale(Math.abs(d));
      }
    };

    ParallelCoords.prototype.create_nodes = function() {
      var _this = this;
      this.data.forEach(function(d) {
        var node;
        node = {
          id: d.id,
          radius: _this.radius_scale(parseInt(d.Calories)),
          value: d.Calories,
          name: d.Cereal,
          manufacturer: d.Manufacturer,
          type: d.Type,
          protein: d.Protein,
          fat: d.Fat,
          sodium: d.Sodium,
          fiber: d.Fiber,
          carbs: d.Carbohydrates,
          sugars: d.Sugars,
          shelf: d.Shelf,
          potassium: d.Potassium,
          vitamins: d.Vitamins,
          weight: d.Weight,
          cups: d.Cups,
          x: Math.random() * 1000,
          y: Math.random() * 800,
          color: _this.color(d.Manufacturer)
        };
        return _this.nodes.push(node);
      });
      return this.nodes.sort(function(a, b) {
        return b.value - a.value;
      });
    };

    ParallelCoords.prototype.show_details = function(data, i, element) {
      var content;
      content = "<span class=\"name\">Cereal:</span><span class=\"value\"> " + data.name + "</span><br/>";
      content += "<span class=\"name\">Calories:</span><span class=\"value\"> " + (addCommas(data.value)) + "</span><br/>";
      content += "<span class=\"name\">Manufacturer:</span><span class=\"value\"> " + data.manufacturer + "</span><br/>";
      content += "<span class=\"name\">Type:</span><span class=\"value\"> " + data.type + "</span><br/>";
      content += "<span class=\"name\">Protein:</span><span class=\"value\"> " + (Math.abs(data.protein)) + "</span><br/>";
      content += "<span class=\"name\">Fat:</span><span class=\"value\"> " + (Math.abs(data.fat)) + "</span><br/>";
      content += "<span class=\"name\">Sodium:</span><span class=\"value\"> " + (Math.abs(data.sodium)) + "</span><br/>";
      content += "<span class=\"name\">Fiber:</span><span class=\"value\"> " + (Math.abs(data.fiber)) + "</span><br/>";
      content += "<span class=\"name\">Carbohydrates:</span><span class=\"value\"> " + (Math.abs(data.carbs)) + "</span><br/>";
      content += "<span class=\"name\">Sugars:</span><span class=\"value\"> " + (Math.abs(data.sugars)) + "</span><br/>";
      content += "<span class=\"name\">Shelf:</span><span class=\"value\"> " + data.shelf + "</span><br/>";
      content += "<span class=\"name\">Potassium:</span><span class=\"value\"> " + (Math.abs(data.potassium)) + "</span><br/>";
      content += "<span class=\"name\">Vitamins:</span><span class=\"value\"> " + (Math.abs(data.vitamins)) + "</span><br/>";
      content += "<span class=\"name\">Weight:</span><span class=\"value\"> " + (Math.abs(data.weight)) + "</span><br/>";
      content += "<span class=\"name\">Cups:</span><span class=\"value\"> " + (Math.abs(data.cups)) + "</span>";
      return window.tooltip.showTooltip(content, d3.event);
    };

    ParallelCoords.prototype.hide_details = function(data, i, element) {
      var d, id, _i, _len, _ref;
      d = d3.select(element).data();
      id = d[0].name;
      _ref = window.lines[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i.__data__.name === id) {
          d3.select(i).style("stroke-width", 1);
        }
      }
      d3.selectAll("path.node").data(d[0]).style("stroke-width", 1);
      return window.tooltip.hideTooltip();
    };

    ParallelCoords.prototype.select = function(data, i, element) {
      var d, id, _i, _len, _ref;
      d = d3.select(element).data();
      id = d[0].name;
      _ref = window.circles[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i.__data__.name === id) {
          d3.select(i).style("stroke", "black");
          d3.select(i).style("stroke-width", 7);
        }
      }
      d3.select(element).style("stroke-width", 10);
      return this.show_details(data, i, element);
    };

    ParallelCoords.prototype.unselect = function(data, i, element) {
      var d, id, _i, _len, _ref;
      d = d3.select(element).data();
      id = d[0].name;
      _ref = window.circles[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i.__data__.name === id) {
          d3.select(i).style("stroke", null);
          d3.select(i).style("stroke-width", 1);
        }
      }
      d3.select(element).style("stroke-width", 1);
      return this.hide_details(data, i, element);
    };

    ParallelCoords.prototype.create_vis = function() {
      var that,
        _this = this;
      this.parallel = d3.select("#chart-left").append("svg").attr("width", this.parWidth).attr("height", this.parHeight).attr("id", "svg_parallel");
      this.force.nodes(this.nodes).start();
      that = this;
      this.lines = this.parallel.selectAll("path.node").data(this.nodes, function(d) {
        return d.name;
      }).attr("id", function(d) {
        return '#' + String(d.name);
      }).enter().append("path").attr("class", "node").attr("name", function(d) {
        return d.name;
      }).style("stroke-width", 1).style("stroke", function(d) {
        return d.color;
      }).on("mouseover", function(d, i) {
        return that.select(d, i, this);
      }).on("mouseout", function(d, i) {
        return that.unselect(d, i, this);
      });
      this.g = this.parallel.selectAll("g.trait").data(['Manufacturer', 'Calories', 'Protein', 'Fat', 'Sodium', 'Fiber', 'Carbohydrates', 'Sugars', 'Potassium', 'Vitamins']).enter().append("svg:g").attr("class", "trait").attr("transform", function(d, i) {
        return "translate(" + (40 + (_this.parWidth / _this.columns) * i) + ")";
      });
      this.g.append("svg:g").attr("class", "axis").each(function(d) {
        return d3.select(this).call(that.axis.scale(that.scales[String(d)]));
      }).append("svg:text").attr("class", "title").attr("text-anchor", "middle").attr("y", 12).text(String);
      this.force.on("tick", function() {}, this.lines.attr("d", function(d, i) {
        return _this.line([
          {
            x: 40 + (_this.parWidth / _this.columns) * 0,
            y: that.getScale('Manufacturer', d.manufacturer)
          }, {
            x: 40 + (_this.parWidth / _this.columns) * 1,
            y: that.getScale('Calories', d.value)
          }, {
            x: 40 + (_this.parWidth / _this.columns) * 2,
            y: that.getScale('Protein', d.protein)
          }, {
            x: 40 + (_this.parWidth / _this.columns) * 3,
            y: that.getScale('Fat', d.fat)
          }, {
            x: 40 + (_this.parWidth / _this.columns) * 4,
            y: that.getScale('Sodium', d.sodium)
          }, {
            x: 40 + (_this.parWidth / _this.columns) * 5,
            y: that.getScale('Fiber', d.fiber)
          }, {
            x: 40 + (_this.parWidth / _this.columns) * 6,
            y: that.getScale('Carbohydrates', Math.abs(d.carbs))
          }, {
            x: 40 + (_this.parWidth / _this.columns) * 7,
            y: that.getScale('Sugars', Math.abs(d.sugars))
          }, {
            x: 40 + (_this.parWidth / _this.columns) * 8,
            y: that.getScale('Potassium', d.potassium)
          }, {
            x: 40 + (_this.parWidth / _this.columns) * 9,
            y: that.getScale('Vitamins', d.vitamins)
          }
        ]);
      }));
      return window.lines = this.lines;
    };

    return ParallelCoords;

  })();

  BubbleChart = (function() {
    function BubbleChart(data) {
      this.get_selected = __bind(this.get_selected, this);
      this.hide_details = __bind(this.hide_details, this);
      this.show_details = __bind(this.show_details, this);
      this.hide_manufacturers = __bind(this.hide_manufacturers, this);
      this.display_manufacturers = __bind(this.display_manufacturers, this);
      this.move_towards_manufacturer = __bind(this.move_towards_manufacturer, this);
      this.resize_by_calories = __bind(this.resize_by_calories, this);
      this.setRadiusByCalories = __bind(this.setRadiusByCalories, this);
      this.resize_by_protein = __bind(this.resize_by_protein, this);
      this.setRadiusByProtein = __bind(this.setRadiusByProtein, this);
      this.resize_by_sugar = __bind(this.resize_by_sugar, this);
      this.setRadiusBySugar = __bind(this.setRadiusBySugar, this);
      this.color_by_protein = __bind(this.color_by_protein, this);
      this.setColorByProtein = __bind(this.setColorByProtein, this);
      this.color_by_manufacturer = __bind(this.color_by_manufacturer, this);
      this.setColorByManufacturer = __bind(this.setColorByManufacturer, this);
      this.color_by_calories = __bind(this.color_by_calories, this);
      this.setColorByCalorie = __bind(this.setColorByCalorie, this);
      this.color_by_sugars = __bind(this.color_by_sugars, this);
      this.setColorBySugar = __bind(this.setColorBySugar, this);
      this.display_by_manufacturer = __bind(this.display_by_manufacturer, this);
      this.move_towards_center = __bind(this.move_towards_center, this);
      this.display_group_all = __bind(this.display_group_all, this);
      this.start = __bind(this.start, this);
      this.create_vis = __bind(this.create_vis, this);
      this.create_nodes = __bind(this.create_nodes, this);
      var max_amount, max_protein, max_sugar;
      this.data = data;
      this.width = 1000;
      this.height = 600;
      this.colSpace = 1000 / 7;
      this.txtSpace = 1000 / 7 * 2;
      window.tooltip = CustomTooltip("cereal_tooltip", 240);
      this.center = {
        x: this.width / 2,
        y: this.height / 2
      };
      this.manufacturer_centers = {
        "A": {
          x: this.width / 2 - this.colSpace * 1.5,
          y: this.height / 2
        },
        "G": {
          x: this.width / 2 - this.colSpace * 1,
          y: this.height / 2
        },
        "N": {
          x: this.width / 2 - this.colSpace * 0.5,
          y: this.height / 2
        },
        "P": {
          x: this.width / 2,
          y: this.height / 2
        },
        "K": {
          x: this.width / 2 + this.colSpace * 0.5,
          y: this.height / 2
        },
        "Q": {
          x: this.width / 2 + this.colSpace * 1,
          y: this.height / 2
        },
        "R": {
          x: this.width / 2 + this.colSpace * 1.5,
          y: this.height / 2
        }
      };
      this.layout_gravity = -0.01;
      this.damper = 0.1;
      this.vis = null;
      this.nodes = [];
      this.force = null;
      this.circles = null;
      this.circleSelected = null;
      this.fill_color = d3.scale.ordinal().domain(["A", "G", "N", "P", "K", "Q", "R"]).range(colorbrewer.Paired[7]);
      max_amount = d3.max(this.data, function(d) {
        return parseInt(d.Calories);
      });
      this.radius_scale = d3.scale.pow().exponent(4).domain([0, max_amount]).range([10, 85]);
      this.fill_color_calories = d3.scale.linear().domain([0, max_amount]).range(["hsl(128,99%,100%)", "hsl(228,30%,20%))"]);
      this.fill_color_calories.interpolate(d3.interpolateHsl);
      max_sugar = d3.max(this.data, function(d) {
        return parseInt(d.Sugars);
      });
      this.radius_sugar_scale = d3.scale.pow().exponent(2).domain([0, max_sugar]).range([10, 65]);
      this.fill_color_sugars = d3.scale.linear().domain([0, max_sugar]).range(["hsl(160, 150%, 100%)", "hsl(146, 90%, 39%)"]);
      this.fill_color_sugars.interpolate(d3.interpolateHsl);
      max_protein = d3.max(this.data, function(d) {
        return parseInt(d.Protein);
      });
      this.radius_protein_scale = d3.scale.pow().exponent(2).domain([0, max_protein]).range([10, 65]);
      this.fill_color_protein = d3.scale.linear().domain([0, max_protein]).range(["hsl(350, 150%, 100%)", "hsl(358, 100%, 51%)"]);
      this.fill_color_protein.interpolate(d3.interpolateHsl);
      this.previousStrokeColor = null;
      this.create_nodes();
      this.create_vis();
    }

    BubbleChart.prototype.create_nodes = function() {
      var _this = this;
      this.data.forEach(function(d) {
        var node;
        node = {
          id: d.id,
          radius: _this.radius_scale(parseInt(d.Calories)),
          value: d.Calories,
          name: d.Cereal,
          manufacturer: d.Manufacturer,
          type: d.Type,
          protein: d.Protein,
          fat: d.Fat,
          sodium: d.Sodium,
          fiber: d.Fiber,
          carbs: d.Carbohydrates,
          sugars: d.Sugars,
          shelf: d.Shelf,
          potassium: d.Potassium,
          vitamins: d.Vitamins,
          weight: d.Weight,
          cups: d.Cups,
          x: Math.random() * 1000,
          y: Math.random() * 800,
          color: _this.fill_color(d.Manufacturer)
        };
        return _this.nodes.push(node);
      });
      return this.nodes.sort(function(a, b) {
        return b.value - a.value;
      });
    };

    BubbleChart.prototype.create_vis = function() {
      var that,
        _this = this;
      this.vis = d3.select("#vis").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "svg_vis");
      this.circles = this.vis.selectAll("circle").data(this.nodes, function(d) {
        return d.id;
      });
      that = this;
      this.circles.enter().append("circle").attr("r", 0).attr("fill", function(d) {
        return d.color;
      }).attr("stroke-width", 2).attr("stroke", function(d) {
        return null;
      }).attr("id", function(d) {
        return "bubble_" + d.id;
      }).on("mouseover", function(d, i) {
        return that.show_details(d, i, this);
      }).on("mouseout", function(d, i) {
        return that.hide_details(d, i, this);
      });
      this.circles.transition().duration(2000).attr("r", function(d) {
        return d.radius;
      });
      return window.circles = this.circles;
    };

    BubbleChart.prototype.charge = function(d) {
      return -Math.pow(d.radius, 2.0) / 8;
    };

    BubbleChart.prototype.start = function() {
      return this.force = d3.layout.force().nodes(this.nodes).size([this.width, this.height]);
    };

    BubbleChart.prototype.display_group_all = function() {
      var _this = this;
      this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
        return _this.circles.each(_this.move_towards_center(e.alpha)).attr("cx", function(d) {
          return d.x;
        }).attr("cy", function(d) {
          return d.y;
        });
      });
      this.force.start();
      return this.hide_manufacturers();
    };

    BubbleChart.prototype.move_towards_center = function(alpha) {
      var _this = this;
      return function(d) {
        d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
        return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
      };
    };

    BubbleChart.prototype.display_by_manufacturer = function() {
      var _this = this;
      this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
        return _this.circles.each(_this.move_towards_manufacturer(e.alpha)).attr("cx", function(d) {
          return d.x;
        }).attr("cy", function(d) {
          return d.y;
        });
      });
      return this.force.start();
    };

    BubbleChart.prototype.setColorBySugar = function() {
      var _this = this;
      return function(d) {
        return d.color = _this.fill_color_sugars(d.sugars);
      };
    };

    BubbleChart.prototype.color_by_sugars = function() {
      var _this = this;
      this.circles.each(this.setColorBySugar).transition().duration(2000).attr("fill", function(d) {
        return _this.fill_color_sugars(d.sugars);
      }).attr("stroke-width", 2).attr("stroke", function(d) {
        d3.hsl(_this.fill_color_sugars(d.sugars)).darker();
        return _this.previousStrokeColor = "hsl";
      });
      return window.circles = this.circles;
    };

    BubbleChart.prototype.setColorByCalorie = function() {
      var _this = this;
      return function(d) {
        return d.color = _this.fill_color_calories(d.value);
      };
    };

    BubbleChart.prototype.color_by_calories = function() {
      var _this = this;
      this.circles.each(this.setColorByCalorie).transition().duration(2000).attr("fill", function(d) {
        return _this.fill_color_calories(d.value);
      }).attr("stroke-width", 2).attr("stroke", function(d) {
        d3.hsl(_this.fill_color_calories(d.value)).darker();
        return _this.previousStrokeColor = "hsl";
      });
      return window.circles = this.circles;
    };

    BubbleChart.prototype.setColorByManufacturer = function() {
      var _this = this;
      return function(d) {
        return d.color = _this.fill_color(d.manufacturer);
      };
    };

    BubbleChart.prototype.color_by_manufacturer = function() {
      var _this = this;
      this.circles.each(this.setColorByManufacturer).transition().duration(2000).attr("fill", function(d) {
        return d.color;
      }).attr("stroke-width", 2).attr("stroke", function(d) {
        d3.rgb(d.color).darker();
        return _this.previousStrokeColor = "rgb";
      });
      return window.circles = this.circles;
    };

    BubbleChart.prototype.setColorByProtein = function() {
      var _this = this;
      return function(d) {
        return d.color = _this.fill_color_protein(d.protein);
      };
    };

    BubbleChart.prototype.color_by_protein = function() {
      var _this = this;
      this.circles.each(this.setColorByProtein).transition().duration(2000).attr("fill", function(d) {
        return _this.fill_color_protein(d.protein);
      }).attr("stroke-width", 2).attr("stroke", function(d) {
        d3.hsl(_this.fill_color_protein(d.protein)).darker();
        return _this.previousStrokeColor = "hsl";
      });
      return window.circles = this.circles;
    };

    BubbleChart.prototype.setRadiusBySugar = function() {
      var _this = this;
      return function(d) {
        return d.radius = _this.radius_sugar_scale(Math.abs(d.sugars));
      };
    };

    BubbleChart.prototype.resize_by_sugar = function() {
      this.circles.each(this.setRadiusBySugar()).transition().duration(2000).attr("r", function(d) {
        return d.radius;
      });
      return window.circles = this.circles;
    };

    BubbleChart.prototype.setRadiusByProtein = function() {
      var _this = this;
      return function(d) {
        return d.radius = _this.radius_protein_scale(Math.abs(d.protein));
      };
    };

    BubbleChart.prototype.resize_by_protein = function() {
      this.circles.each(this.setRadiusByProtein()).transition().duration(2000).attr("r", function(d) {
        return d.radius;
      });
      return window.circles = this.circles;
    };

    BubbleChart.prototype.setRadiusByCalories = function() {
      var _this = this;
      return function(d) {
        return d.radius = _this.radius_scale(Math.abs(d.value));
      };
    };

    BubbleChart.prototype.resize_by_calories = function() {
      this.circles.each(this.setRadiusByCalories()).transition().duration(2000).attr("r", function(d) {
        return d.radius;
      });
      window.circles = this.circles;
      return this.display_manufacturers();
    };

    BubbleChart.prototype.move_towards_manufacturer = function(alpha) {
      var _this = this;
      return function(d) {
        var target;
        target = _this.manufacturer_centers[d.manufacturer];
        d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
        return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
      };
    };

    BubbleChart.prototype.display_manufacturers = function() {
      var manufacturers, manufacturers_data, manufacturers_x;
      manufacturers_x = {
        "A": this.width / 2 - this.txtSpace * 1.5,
        "G": this.width / 2 - this.txtSpace * 1,
        "N": this.width / 2 - this.txtSpace * 0.5,
        "P": this.width / 2,
        "K": this.width / 2 + this.txtSpace * 0.5,
        "Q": this.width / 2 + this.txtSpace * 1,
        "R": this.width / 2 + this.txtSpace * 1.5
      };
      manufacturers_data = d3.keys(manufacturers_x);
      return manufacturers = this.vis.selectAll(".manufacturers").data(manufacturers_data);
    };

    BubbleChart.prototype.hide_manufacturers = function() {
      var manufacturers;
      return manufacturers = this.vis.selectAll(".manufacturers").remove();
    };

    BubbleChart.prototype.show_details = function(data, i, element) {
      var content, d, id, _i, _len, _ref;
      d3.select(element).attr("stroke", "black");
      d3.select(element).style("stroke-width", 7);
      d = d3.select(element).data();
      id = d[0].name;
      _ref = window.lines[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i.__data__.name === id) {
          d3.select(i).style("stroke-width", 10);
        }
      }
      content = "<span class=\"name\">Cereal:</span><span class=\"value\"> " + data.name + "</span><br/>";
      content += "<span class=\"name\">Calories:</span><span class=\"value\"> " + (addCommas(data.value)) + "</span><br/>";
      content += "<span class=\"name\">Manufacturer:</span><span class=\"value\"> " + data.manufacturer + "</span><br/>";
      content += "<span class=\"name\">Type:</span><span class=\"value\"> " + data.type + "</span><br/>";
      content += "<span class=\"name\">Protein:</span><span class=\"value\"> " + (Math.abs(data.protein)) + "</span><br/>";
      content += "<span class=\"name\">Fat:</span><span class=\"value\"> " + (Math.abs(data.fat)) + "</span><br/>";
      content += "<span class=\"name\">Sodium:</span><span class=\"value\"> " + (Math.abs(data.sodium)) + "</span><br/>";
      content += "<span class=\"name\">Fiber:</span><span class=\"value\"> " + (Math.abs(data.fiber)) + "</span><br/>";
      content += "<span class=\"name\">Carbohydrates:</span><span class=\"value\"> " + (Math.abs(data.carbs)) + "</span><br/>";
      content += "<span class=\"name\">Sugars:</span><span class=\"value\"> " + (Math.abs(data.sugars)) + "</span><br/>";
      content += "<span class=\"name\">Shelf:</span><span class=\"value\"> " + data.shelf + "</span><br/>";
      content += "<span class=\"name\">Potassium:</span><span class=\"value\"> " + (Math.abs(data.potassium)) + "</span><br/>";
      content += "<span class=\"name\">Vitamins:</span><span class=\"value\"> " + (Math.abs(data.vitamins)) + "</span><br/>";
      content += "<span class=\"name\">Weight:</span><span class=\"value\"> " + (Math.abs(data.weight)) + "</span><br/>";
      content += "<span class=\"name\">Cups:</span><span class=\"value\"> " + (Math.abs(data.cups)) + "</span>";
      return window.tooltip.showTooltip(content, d3.event);
    };

    BubbleChart.prototype.hide_details = function(data, i, element) {
      var d, id, _i, _len, _ref,
        _this = this;
      d3.select(element).attr("stroke", function(d) {
        return null;
      });
      d3.select(element).attr("stroke-width", function(d) {
        return 2;
      });
      d = d3.select(element).data();
      id = d[0].name;
      _ref = window.lines[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i.__data__.name === id) {
          d3.select(i).style("stroke-width", 1);
        }
      }
      d3.selectAll("path.node").data(d[0]).style("stroke-width", 1);
      return window.tooltip.hideTooltip();
    };

    BubbleChart.prototype.get_selected = function() {
      return this.circleSelected;
    };

    return BubbleChart;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  $(function() {
    var chart, parallel_chart, render_parallel, render_vis,
      _this = this;
    chart = null;
    parallel_chart = null;
    render_parallel = function(json) {
      return parallel_chart = new ParallelCoords(json);
    };
    render_vis = function(csv) {
      chart = new BubbleChart(csv);
      chart.start();
      return root.display_all();
    };
    root.display_all = function() {
      return chart.display_group_all();
    };
    root.display_manufacturers = function() {
      return chart.display_by_manufacturer();
    };
    root.toggle_view = function(view_type) {
      if (view_type === 'manufacturer') {
        return root.display_manufacturers();
      } else if (view_type === 'resize_by_sugar') {
        return chart.resize_by_sugar();
      } else if (view_type === 'resize_by_calories') {
        return chart.resize_by_calories();
      } else if (view_type === 'resize_by_protein') {
        return chart.resize_by_protein();
      } else if (view_type === 'calories_in_color') {
        return chart.color_by_calories();
      } else if (view_type === 'sugars_in_color') {
        return chart.color_by_sugars();
      } else if (view_type === 'manufacturer_by_color') {
        return chart.color_by_manufacturer();
      } else if (view_type === 'protein_by_color') {
        return chart.color_by_protein();
      } else {
        root.display_all();
        return root.nodeSelected = chart.get_selected();
      }
    };
    d3.csv("data/a1-cereals.csv", render_vis);
    return d3.csv("data/a1-cereals.csv", render_parallel);
  });

}).call(this);

/*
//@ sourceMappingURL=vis.map
*/
