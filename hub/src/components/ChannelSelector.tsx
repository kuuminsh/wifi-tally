import { makeStyles, Select } from "@material-ui/core";
import React from "react";
import Channel from '../domain/Channel'

const useStyles = makeStyles(theme => ({
    root: {
        display: "block",
        overflow: "hidden",
        marginBottom: theme.spacing(2),
    },
    select: {
        paddingTop: theme.spacing(1),
    },
}))

type ChannelSelectorProps = {
    channels?: Channel[]
    value?: string|string[]
    onChange?: (value: string[]) => void
}

const ChannelSelector = ({channels, value = [], onChange} : ChannelSelectorProps) => {
    channels = channels || []
    const classes = useStyles()
    const values = typeof value === "string" ? [value] : value

    const handleValueChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions as HTMLCollectionOf<HTMLOptionElement>)
            .map(option => option.value)
            .filter(value => value !== "")

        if (onChange) {
            onChange(selectedValues)
        }
    }

    const availableChannelIds = channels.map(channel => channel.id)
    const missingChannelIds = values.filter(value => availableChannelIds.indexOf(value) === -1)

    return (<Select data-testid="channel-selector" native multiple autoWidth={true} className={classes.root} classes={{ select: classes.select }} inputProps={{ size: 15 }} value={values} onChange={handleValueChange}>
        <option value="" key={null}>(unpatched)</option>
        {channels.map(c => {
            return <option key={c.id} value={c.id}>{`${c.id} ${c.name || `Channel ${c.id}`}`}</option>
        })}
        {missingChannelIds.map(channelId => <option key={channelId} value={channelId}>{channelId} Channel {channelId}</option>)}
    </Select>)
}

export default ChannelSelector;
