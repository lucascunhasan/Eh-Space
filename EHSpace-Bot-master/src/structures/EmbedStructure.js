module.exports = class EHEmbed {
    constructor() {
        this.fields = [];
    };
    addField(name, value, inline = false) {
        this.fields?.push({ name, value, inline });
        return this;
    }

    setAuthor(name, iconURL, url) {
        this.author = {
            name,
            icon_url: iconURL,
            url
        };

        return this;
    }

    setColor(color) {
        if (color === 'RANDOM') {
            this.color = Math.floor(Math.random() * (0xffffff + 1));
        } else {
            this.color = Number(color);
        }
        return this;
    }

    setDescription(description) {
        this.description = description;

        return this;
    }

    setFooter(text, iconURL) {
        this.footer = {
            text,
            icon_url: iconURL
        }

        return this;
    }

    setImage(url) {
        this.image = {
            url
        }
        return this;
    }

    setThumbnail(url) {
        this.thumbnail = {
            url
        }
        return this;
    }

    setTimestamp(timestamp) {
        if (!timestamp) {
            this.timestamp = new Date();
        } else {
            this.timestamp = timestamp;
        }
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setURL(url) {
        this.url = url;
        return this;
    }
}